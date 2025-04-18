"use client";
import { XPEntry } from '@/types/xp';
import { mockProjects } from '@/utils/xpCalculations';
import { Trash2, Star } from 'lucide-react';

interface ProjectListProps {
  entries: XPEntry[];
  onRemove: (id: string) => void;
}

export function ProjectList({ entries, onRemove }: ProjectListProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center text-gray-400 py-12">
        <p className="text-lg">No projects added yet</p>
        <p className="text-sm">Add your first project to calculate XP</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {entries.map((entry) => {
        const project = mockProjects.find((p) => p.id === entry.projectId);
        return (
          <div
            key={entry.id}
            className="group relative overflow-hidden bg-gradient-to-r from-gray-800/30 to-gray-800/20 p-4 rounded-xl border border-gray-700/50 transition-all hover:border-blue-500/30"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all" />
            
            <div className="relative flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white flex items-center gap-2">
                  {project?.name}
                  {entry.hasBonus && (
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  )}
                </h3>
                <p className="text-sm text-gray-400">Score: {entry.score}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-blue-400 font-medium">
                  +{entry.totalXP.toLocaleString()} XP
                </span>
                <button
                  onClick={() => onRemove(entry.id)}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}