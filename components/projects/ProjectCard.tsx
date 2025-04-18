import { Download, ClipboardCheck, Clock, Tag, Users, Trophy } from 'lucide-react';
import { Project } from '@/types/project';
import { Profile } from '@/hooks/useUser';

interface ProjectCardProps {
  user: Profile;
  project: Project;
}

export function ProjectCard({ user, project }: ProjectCardProps) {

  const difficultyColors = {
    beginner: 'bg-green-600/20 text-green-400',
    intermediate: 'bg-yellow-600/20 text-yellow-400',
    advanced: 'bg-red-600/20 text-red-400',
  };

  const status = user.projects_users.find(projectUser => projectUser.project.id == project.project_id)?.status || "not started";


  const getStatusColor = () => {
    if (status == "finished")
      return "bg-green-600";
    else if (status == "in_progress")
      return "bg-blue-600";
    else if (status == "creating_group")
      return "bg-cyan-700";
    else
      return "bg-gray-600";
  }

  return (
    <div className="flex flex-col justify-between bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-blue-500/30 transition-all group">
      <div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 mb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{project.name}</h3>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className={`px-2 py-1 rounded-full text-white ${getStatusColor()}`}>
                {/* {project.status.replace('_', ' ')} */}
                {status.split('_').join(' ')}
              </span>
              <span className="flex items-center gap-1 text-gray-400">
                <Clock className="w-4 h-4" />
                {project.estimatedHours}h
              </span>
              <span className="flex items-center gap-1 text-gray-400">
                <Users className="w-4 h-4" />
                {project.teamSize.min}{(project.teamSize.max > project.teamSize.min) && `- ${project.teamSize.max}`}
              </span>
              <span className="flex items-center gap-1 text-blue-400">
                <Trophy className="w-4 h-4" />
                {project.baseXP.toLocaleString()} XP
              </span>
            </div>
          </div>
          <span className={`self-start px-3 py-1 rounded-full text-sm ${difficultyColors[project.difficulty]}`}>
            {project.difficulty}
          </span>
        </div>

        <p className="text-gray-400 mb-4 line-clamp-2 sm:line-clamp-none">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
          {project.tags.map(tag => (
            <span key={tag} className="flex items-center gap-1 px-2 py-1 bg-gray-700/50 rounded-full text-xs text-gray-300">
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {project.oldSubject &&
          <a
            href={project.oldSubject}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Subject (old)
          </a>
        }
        <a
          href={project.subjectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          Subject
        </a>
      </div>
    </div>
  );
}