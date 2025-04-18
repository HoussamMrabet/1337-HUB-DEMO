"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Check, CheckSquare } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  label: string;
  icon: React.ReactNode;
}

export function MultiSelect({ options, value, onChange, label, icon }: MultiSelectProps) {
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

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  const isAllSelected = value.length === options.length;
  const toggleSelectAll = () => {
    onChange(isAllSelected ? [] : options.map(o => o.value));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 bg-gray-800/50 text-left rounded-lg text-gray-300 hover:bg-gray-800 transition-colors flex items-center gap-2"
      >
        {icon}
        <span className="flex-1 truncate">
          {value.length === 0 ? `Select ${label}` : 
           isAllSelected ? `All ${label}` :
           value.length === 1 ? options.find(o => o.value === value[0])?.label :
           `${value.length} ${label} selected`}
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-64 mt-2 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
          <div className="p-2 border-b border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${label.toLowerCase()}...`}
                className="w-full pl-9 pr-4 py-2 bg-gray-700/50 rounded-md text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto">
            <button
              onClick={toggleSelectAll}
              className="w-full px-3 py-2 text-sm text-blue-400 hover:bg-blue-600/10 transition-colors flex items-center justify-between border-b border-gray-700"
            >
              <span className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4" />
                Select All
              </span>
              {isAllSelected && <Check className="w-4 h-4" />}
            </button>

            <div className="p-2">
              {filteredOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => {
                    const newValue = value.includes(option.value)
                      ? value.filter(v => v !== option.value)
                      : [...value, option.value];
                    onChange(newValue);
                  }}
                  className={`w-full px-3 py-2 rounded-md text-sm flex items-center justify-between ${
                    value.includes(option.value)
                      ? 'bg-blue-600/20 text-blue-400'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {option.label}
                  {value.includes(option.value) && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>

          {value.length > 0 && (
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
  );
}