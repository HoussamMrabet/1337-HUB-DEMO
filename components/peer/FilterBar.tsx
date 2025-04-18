"use client";
import { Filter, MapPin } from 'lucide-react';
import { ProjectFilter } from './ProjectFilter';
import { StatusFilter } from './StatusFilter';
import { TeamStatus } from '@/types/peer';

interface FilterBarProps {
  selectedProjects: string[];
  selectedStatuses: TeamStatus[];
  selectedcampuses: string[];
  availableProjects: { id: string; name: string; }[];
  availablecampuses: string[];
  onProjectsChange: (projects: string[]) => void;
  onStatusesChange: (statuses: TeamStatus[]) => void;
  oncampusesChange: (campuses: string[]) => void;
}

export function FilterBar({
  selectedProjects,
  selectedStatuses,
  selectedcampuses,
  availableProjects,
  availablecampuses,
  onProjectsChange,
  onStatusesChange,
  oncampusesChange,
}: FilterBarProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 space-y-6">
      <div className="flex items-center gap-2 text-blue-400">
        <Filter className="w-5 h-5" />
        <h2 className="font-medium">Filters</h2>
      </div>
      
      <div className="grid gap-6">
        <ProjectFilter
          selectedProjects={selectedProjects}
          availableProjects={availableProjects}
          onChange={onProjectsChange}
        />

        <StatusFilter
          selectedStatuses={selectedStatuses}
          onChange={onStatusesChange}
        />

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
            <MapPin className="w-4 h-4" />
            Campuses
          </label>
          <div className="flex flex-wrap gap-2">
            {availablecampuses.map(campus => (
              <label
                key={campus}
                className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all ${
                  selectedcampuses.includes(campus)
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg shadow-orange-500/20'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedcampuses.includes(campus)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      oncampusesChange([...selectedcampuses, campus]);
                    } else {
                      oncampusesChange(selectedcampuses.filter(c => c != campus));
                    }
                  }}
                  className="sr-only"
                />
                {campus == '16' ? "Khouribga" : campus == '21' ? "Benguerir" : campus == '55' ? "MED" : "Rabat"}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}