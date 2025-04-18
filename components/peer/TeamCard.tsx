import { Project, Team, TeamStatus } from '@/types/peer';
import { Calendar, Clock, Users, Loader, Activity } from 'lucide-react';

interface TeamCardProps {
  project: Project;
  team: Team;
}

export function TeamCard({ project, team }: TeamCardProps) {
  const statusColors: Record<TeamStatus, string> = {
    // finished: 'text-green-400',
    in_progress: 'text-blue-400',
    creating_group: 'text-yellow-400',
    waiting_for_correction: 'text-orange-400',
    // active: "text-purple-400",
  };

  const StatusIcon = 
    // team.status === 'finished' ? CheckCircle :
    team.status === 'in_progress' ? Activity :
    team.status === 'creating_group' ? Loader :
    // team.status === 'active' ? Activity :
    Clock;


  return (
    <a href={"https://projects.intra.42.fr/"+project.description+"/"+team.users[0].name} target='_blank' rel="noreferrer" className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/30 transition-all">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white truncate max-w-full" title={team.name}>{team.name}</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-400">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">
            Started: {team.startDate.substring(0, 10)}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-400">
          <Users className="w-4 h-4" />
          <span className="text-sm">{team.users.length} members</span>
        </div>

        <div className="flex items-center justify-between">
          <div className='flex -space-x-2'>
            {team.users.map(user => (
              <div
              key={user.avatar + user.campus + user.name + user.id}
              className="relative group"
              onClick={() => window.open(`https://profile.intra.42.fr/users/${user.name}`, '_blank')}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border-2 border-gray-800 hover:z-10 transition-all object-cover"
                  />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {user.name}
                </div>
              </div>
            ))}
          </div>
          <span className={`flex items-center gap-2 ${statusColors[team.status]}`}>
            <StatusIcon className="w-4 h-4" />
            <span className="text-sm capitalize">{team.status.split('_').join(' ')}</span>
          </span>
        </div>
      </div>
    </a>
  );
}