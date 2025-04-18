"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Plus, Target, Trophy, Search, ChevronDown } from 'lucide-react';
import { Project } from '@/types/xp';

interface ProjectFormProps {
  projects: Project[];
  onSubmit: (projectId: string, score: number, hasBonus: boolean) => void;
}

export function ProjectForm({ projects, onSubmit }: ProjectFormProps) {
  const [projectId, setProjectId] = useState(projects[0]?.id || '');
  const [score, setScore] = useState(100);
  const [hasBonus, setHasBonus] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const comboboxRef = useRef<HTMLDivElement>(null);

  // Filter projects based on search query
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (comboboxRef.current && !comboboxRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(projectId, score, hasBonus);
    setScore(100);
    setHasBonus(false);
  };

  const selectedProject = projects.find(p => p.id === projectId);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative" ref={comboboxRef}>
        <div 
          className="relative cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Target className="h-5 w-5 text-blue-400" />
          </div>
          <div className="pl-10 w-full h-12 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl text-white flex items-center justify-between">
            <span className="truncate">
              {selectedProject?.name || 'Select a project'}
            </span>
            <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 mr-3 ${isOpen ? 'transform rotate-180' : ''}`} />
          </div>
        </div>

        {isOpen && (
          <div className="absolute w-full mt-2 bg-gray-800 border border-gray-700 rounded-xl shadow-lg z-50 overflow-hidden">
            <div className="p-2 border-b border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects..."
                  className="w-full pl-9 pr-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => {
                    setProjectId(project.id);
                    setIsOpen(false);
                    setSearchQuery('');
                  }}
                  className={`px-4 py-3 cursor-pointer transition-colors ${
                    project.id === projectId
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-200 hover:bg-gray-700'
                  }`}
                >
                  {project.name}
                </div>
              ))}
              {filteredProjects.length === 0 && (
                <div className="px-4 py-3 text-gray-400 text-center">
                  No projects found
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-blue-300">Score</label>
          <span className="text-sm text-gray-400">{score}/125</span>  
        </div>
        <input
          type="range"
          min="0"
          max="125"
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>

      <label className="relative flex items-center justify-between p-4 rounded-xl bg-gray-800/30 border border-gray-700 cursor-pointer group transition-all hover:bg-gray-800/50">
        <div className="flex items-center gap-3">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="text-gray-200">Coalition Bonus</span>
        </div>
        <input
          type="checkbox"
          checked={hasBonus}
          onChange={(e) => setHasBonus(e.target.checked)}
          className="sr-only peer"
        />
        <div className="relative inline-block w-11 h-6 bg-gray-700 rounded-full peer-focus:outline-none peer-checked:bg-blue-600 transition-all">
          <span
            className={`absolute top-[2px] left-[2px] w-5 h-5 bg-gray-400 rounded-full transition-transform duration-200 ${
              hasBonus ? "translate-x-5 bg-white" : ""
            }`}
          />
        </div>
      </label>

      <button
        type="submit"
        className="w-full h-12 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
      >
        <Plus className="w-5 h-5" />
        Add Project
      </button>
    </form>
  );
}