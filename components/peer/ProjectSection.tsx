"use client";
import { Folder } from 'lucide-react';
import { TeamCard } from './TeamCard';
import { Project } from '@/types/peer';

interface ProjectSectionProps {
  project: Project;
  selectedStatuses: string[];
  selectedcampuses: string[];
}

export function ProjectSection({ project, selectedStatuses, selectedcampuses }: ProjectSectionProps) {
  if (selectedStatuses.length === 0 || selectedcampuses.length === 0) {
    return null;
  }

  const filteredTeams = project.teams.filter(team => {
    const statusMatch = selectedStatuses.length === 0 || selectedStatuses.includes(team.status);
    const campusMatch = selectedcampuses.length === 0 || team.users.some(user => selectedcampuses.includes(user.campus));
    return statusMatch && campusMatch;
  });

  if (filteredTeams.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 text-white">
        <Folder className="w-5 h-5 text-blue-400" />
        <h2 className="text-xl font-semibold">{project.name}</h2>
        <span className="text-sm text-gray-400">
          {filteredTeams.length} {filteredTeams.length === 1 ? 'team' : 'teams'}
        </span>
      </div>

      {/* <p className="text-gray-400">{project.description}</p> */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeams.map((team, index) => (
          <TeamCard key={team.id + index + team.startDate} team={team} project={project} />
        ))}
      </div>
    </div>
  );
}