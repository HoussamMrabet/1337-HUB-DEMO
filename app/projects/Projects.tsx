"use client";
import { useState } from "react";
import { FolderKanban, Search } from "lucide-react";
import { mockProjects } from "@/utils/mockProjects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import useUser from "@/hooks/useUser";
import { ApiErrorScreen } from "@/components/error/ApiErrorScreen";
import { LoadingProjects } from "@/components/loading/LoadingProjects";

export function Projects() {
    const {data: me, isLoading, error, refetch} = useUser();
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<
        "all" | "beginner" | "intermediate" | "advanced"
    >("all");
    const [statusFilter, setStatusFilter] = useState<
        "all" | "not_started" | "in_progress" | "finished" | "creating_group"
    >("all");

    if (isLoading) return <LoadingProjects />
    if (error) return <ApiErrorScreen error={new Error(error.message)} onRetry={refetch} />
    if (!me) return <ApiErrorScreen error={new Error("Failed to get your data")} onRetry={refetch} />

    const filteredProjects = mockProjects.filter((project) => {
        const matchesSearch =
            project.name.toLowerCase().includes(search.toLowerCase()) ||
            project.description.toLowerCase().includes(search.toLowerCase()) ||
            project.tags.some((tag) =>
                tag.toLowerCase().includes(search.toLowerCase())
            );

        const matchesFilter = filter === "all" || project.difficulty === filter;

        // Get the status of the project
        const projectStatus =
            me?.projects_users.find((projectUser) => projectUser.project.id === project.project_id)?.status ||
            "not_started";

        const matchesStatus =
            statusFilter === "all" || projectStatus === statusFilter;

        return matchesSearch && matchesFilter && matchesStatus;
    });
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4 sm:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-start items-center mb-8 sm:mb-12">
                  <div className="flex items-center gap-3">
                    <FolderKanban className="w-8 h-8 text-blue-400" />
                    <h1 className="text-3xl sm:text-4xl font-bold text-white">Projects</h1>
                  </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search projects..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value as typeof filter)}
                            className="px-4 py-2 bg-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All difficulties</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                            className="px-4 py-2 bg-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Status</option>
                            <option value="not_started">Not Started</option>
                            <option value="in_progress">In Progress</option>
                            <option value="finished">Finished</option>
                            <option value="creating_group">Creating Group</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {filteredProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            user={me}
                            project={project}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
