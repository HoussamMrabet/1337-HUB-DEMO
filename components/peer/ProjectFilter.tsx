"use client";
import { useState, useRef, useEffect } from 'react';
import { Target, Search, X, Check } from 'lucide-react';

interface Project {
  id: string;
  name: string;
}

interface ProjectFilterProps {
  selectedProjects: string[];
  availableProjects: Project[];
  onChange: (projects: string[]) => void;
}

export function ProjectFilter({ selectedProjects, availableProjects, onChange }: ProjectFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleProject = (projectId: string) => {
    if (selectedProjects.includes(projectId)) {
      onChange(selectedProjects.filter(id => id !== projectId));
    } else {
      onChange([...selectedProjects, projectId]);
    }
  };

  const filteredProjects = availableProjects.filter(project =>
    project.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedCount = selectedProjects.length;

  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
        <Target className="w-4 h-4" />
        Projects {selectedCount > 0 && `(${selectedCount} selected)`}
      </label>
      
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 bg-gray-800/50 text-left rounded-lg text-gray-300 hover:bg-gray-800 transition-colors flex items-center justify-between"
        >
          <span className="truncate">
            {selectedCount === 0 ? 'Select projects' : 
             selectedCount === 1 ? availableProjects.find(p => p.id === selectedProjects[0])?.name :
             `${selectedCount} projects selected`}
          </span>
          <Target className="w-4 h-4 ml-2" />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-gray-800 rounded-lg shadow-xl border border-gray-700 max-h-[300px] flex flex-col">
            <div className="p-2 border-b border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search projects..."
                  className="w-full pl-9 pr-4 py-2 bg-gray-700/50 rounded-md text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="overflow-y-auto flex-1">
              {filteredProjects.length === 0 ? (
                <div className="p-4 text-center text-gray-400 text-sm">
                  No projects found
                </div>
              ) : (
                <div className="p-2 space-y-1">
                  {filteredProjects.map(project => (
                    <button
                      key={project.id}
                      onClick={() => toggleProject(project.id)}
                      className={`w-full px-3 py-2 rounded-md text-sm flex items-center justify-between transition-colors ${
                        selectedProjects.includes(project.id)
                          ? 'bg-blue-600/20 text-blue-400'
                          : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <span>{project.name}</span>
                      {selectedProjects.includes(project.id) && (
                        <Check className="w-4 h-4" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {selectedCount > 0 && (
              <div className="p-2 border-t border-gray-700">
                <button
                  onClick={() => onChange([])}
                  className="w-full px-3 py-2 text-sm text-red-400 hover:text-red-300 rounded-md hover:bg-red-400/10 transition-colors flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear selection
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {selectedCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedProjects.map(projectId => {
            const project = availableProjects.find(p => p.id === projectId);
            if (!project) return null;
            return (
              <span
                key={project.id}
                className="px-2 py-1 rounded-md bg-blue-600/20 text-blue-400 text-sm flex items-center gap-1"
              >
                {project.name}
                <button
                  onClick={() => toggleProject(project.id)}
                  className="hover:text-blue-300"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}