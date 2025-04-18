import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { Users } from "lucide-react";
import { Project, TeamStatus } from "@/types/peer";
import useTeams, { projectsList } from "@/hooks/useTeams";
import useUser from "@/hooks/useUser";
import useUsers from "@/hooks/useUsers";
import { LoadingTeams } from "@/components/loading/LoadingTeams";
import { ErrorScreen } from "@/components/error/ErrorScreen";
import { FilterBar } from "@/components/peer/FilterBar";
import { ProjectSection } from "@/components/peer/ProjectSection";

const PROJECTS_PER_PAGE = 2;

export function PeerFinder() {
  const { data: teamsData, isLoading, error, refetch } = useTeams();
  const {
    data: users,
    isLoading: isLoadingUsers,
    error: errorUsers,
    refetch: refetchUsers,
  } = useUsers();
  const { data: me } = useUser();
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<TeamStatus[]>([
    "creating_group",
  ]);
  const [selectedcampuses, setSelectedcampuses] = useState<string[]>([]);
  const [visibleProjects, setVisibleProjects] =
    useState<number>(PROJECTS_PER_PAGE);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let campus: string[] = [];
    if (me?.campus?.length) campus.push(me.campus[0].id.toLocaleString());
    setSelectedcampuses(campus);
  }, [me]);

  useEffect(() => {
    const filtered =
      selectedProjects.length > 0
        ? organizedProjects.filter((p) => selectedProjects.includes(p.id))
        : organizedProjects;

    setFilteredProjects(filtered);
    setVisibleProjects(PROJECTS_PER_PAGE);
  }, [selectedProjects, selectedStatuses, selectedcampuses]);

  useEffect(() => {
    const filtered =
      selectedProjects.length > 0
        ? organizedProjects.filter((p) => selectedProjects.includes(p.id))
        : organizedProjects;

    setFilteredProjects(filtered);
  }, [teamsData, users]);

  const availablecampuses = useMemo(() => {
    if (!teamsData) return [];
    const campuses = new Set<string>();
    teamsData.forEach((team) => {
      campuses.add(team.campusId);
    });
    return Array.from(campuses).sort();
  }, [teamsData]);

  const organizedProjects = useMemo(() => {
    if (!teamsData || !users) return [];

    const projectMap = new Map();

    projectsList.forEach((project) => {
      projectMap.set(project.id, {
        id: project.id.toString(),
        name: project.name,
        description: project.slug,
        teams: [],
      });
    });

    teamsData.forEach((team) => {
      const project = projectMap.get(team.project_id);
      if (project) {
        project.teams.push({
          id: team.id.toString(),
          name: team.name,
          status: team.status as TeamStatus,
          startDate: team.created_at,
          users: team.users.map((user) => ({
            id: user.id.toString(),
            name: user.login,
            avatar:
              users?.find((u) => u.id === user.id)?.image.link ??
              `https://profile.intra.42.fr/images/default.png`,
            campus: team.campusId,
            level: 1,
          })),
        });
      }
    });

    return Array.from(projectMap.values());
  }, [users, teamsData, filteredProjects]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        // !isLoadingMore &&
        visibleProjects < filteredProjects.length
      ) {
        // setIsLoadingMore(true);
        setTimeout(() => {
          setVisibleProjects((prev) =>
            Math.min(prev + PROJECTS_PER_PAGE, filteredProjects.length)
          );
          // setIsLoadingMore(false);
        }, 500);
      }
    },
    [filteredProjects.length, visibleProjects]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => observer.disconnect();
  }, [handleObserver, teamsData, users, filteredProjects]);

  if (isLoading || isLoadingUsers) return <LoadingTeams />;
  if (error) return <ErrorScreen message={error.message} onRetry={refetch} />;
  if (errorUsers)
    return <ErrorScreen message={errorUsers.message} onRetry={refetchUsers} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-start items-center mb-8 sm:mb-12">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Peer Finder</h1>
          </div>
        </div>

        <div className="relative z-50">
          <FilterBar
            selectedProjects={selectedProjects}
            selectedStatuses={selectedStatuses}
            selectedcampuses={selectedcampuses}
            availableProjects={projectsList.map((p) => ({
              id: p.id.toString(),
              name: p.name,
            }))}
            availablecampuses={availablecampuses}
            onProjectsChange={setSelectedProjects}
            onStatusesChange={setSelectedStatuses}
            oncampusesChange={setSelectedcampuses}
          />
        </div>

        <div className="space-y-12">
          {filteredProjects.slice(0, visibleProjects).map((project, index) => (
            <ProjectSection
              key={project.name + project.id + index}
              project={project}
              selectedStatuses={selectedStatuses}
              selectedcampuses={selectedcampuses}
            />
          ))}
        </div>

        {visibleProjects < filteredProjects.length && (
          <div ref={loaderRef} className="flex justify-center py-8">
            {isLoadingMore && (
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl rounded-full" />
                <div className="relative flex items-center gap-3 px-6 py-3 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                  </div>
                  <span className="text-blue-400 font-medium">Loading more projects</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
