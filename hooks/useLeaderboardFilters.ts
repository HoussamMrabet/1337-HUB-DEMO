"use client";
import { FilterOptions, User } from '@/types/leaderboard';
import { useMemo } from 'react';

export function useLeaderboardFilters(users: User[], search: string, filters: FilterOptions) {
  return useMemo(() => {
    let filteredUsers = [...users];

    if (filters.coalitions.length > 0) {
      filteredUsers = filteredUsers.filter(user => 
        filters.coalitions.includes(user.coalition.name)
      );
    }

    if (filters.campuses.length > 0) {
      filteredUsers = filteredUsers.filter(user => 
        filters.campuses.includes(user.campus)
      );
    }

    if (filters.years.length > 0) {
      filteredUsers = filteredUsers.filter(user => 
        filters.years.includes(user.startYear.toString())
      );
    }

    filteredUsers = filteredUsers
      .sort((a, b) => b.level - a.level)
      .map((user, index) => ({ ...user, rank: index + 1 }));

    if (search) {
      const searchLower = search.toLowerCase();
      return filteredUsers.filter(
        user =>
          user.fullName.toLowerCase().includes(searchLower) ||
          user.username.toLowerCase().includes(searchLower) ||
          user.coalition.name.toLowerCase().includes(searchLower)
      );
    }

    return filteredUsers;
  }, [users, search, filters]);
}