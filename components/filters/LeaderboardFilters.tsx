"use client";
import { MapPin, Calendar, Shield } from 'lucide-react';
import { MultiSelect } from './MultiSelect';
import { FilterOptions } from '@/types/leaderboard';

interface LeaderboardFiltersProps {
  filters: FilterOptions;
  onChange: (key: keyof FilterOptions, value: string[]) => void;
  availableFilters: {
    coalitions: { value: string; label: string; }[];
    campuses: { value: string; label: string; }[];
    years: { value: string; label: string; }[];
  };
}

export function LeaderboardFilters({ filters, onChange, availableFilters }: LeaderboardFiltersProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <MultiSelect
        options={availableFilters.campuses}
        value={filters.campuses}
        onChange={(value) => onChange('campuses', value)}
        label="Campus"
        icon={<MapPin className="w-4 h-4" />}
      />
      
      <MultiSelect
        options={availableFilters.years}
        value={filters.years}
        onChange={(value) => onChange('years', value)}
        label="Promo"
        icon={<Calendar className="w-4 h-4" />}
      />

      <MultiSelect
        options={availableFilters.coalitions}
        value={filters.coalitions}
        onChange={(value) => onChange('coalitions', value)}
        label="Coalition"
        icon={<Shield className="w-4 h-4" />}
      />      
    </div>
  );
}