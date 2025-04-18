"use client";

import { TeamStatus } from '@/types/peer';

interface StatusFilterProps {
  selectedStatuses: TeamStatus[];
  onChange: (statuses: TeamStatus[]) => void;
}

export function StatusFilter({ selectedStatuses, onChange }: StatusFilterProps) {

  const statuses: { status: TeamStatus; premium?: boolean }[] = [
    { status: 'in_progress' },
    { status: 'creating_group' },
  ];

  const handleStatusClick = (status: TeamStatus) => {
    if (selectedStatuses.includes(status)) {
      onChange(selectedStatuses.filter(s => s !== status));
    } else {
      onChange([...selectedStatuses, status]);
    }
  };

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Status
        </label>
        <div className="flex flex-wrap gap-2">
          {statuses.map(({ status }) => (
            <button
              key={status}
              onClick={() => handleStatusClick(status)}
              className={`group relative px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all ${selectedStatuses.includes(status)
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/20'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
            >
              <span className="flex items-center gap-2">
                {status.replace(/_/g, ' ')}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}