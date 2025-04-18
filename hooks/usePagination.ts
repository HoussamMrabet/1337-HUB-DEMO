"use client";
import { User } from '@/types/leaderboard';
import { useMemo } from 'react';

interface UsePaginationProps {
  users: User[];
  currentPage: number;
  itemsPerPage: number;
}

export function usePagination({ users, currentPage, itemsPerPage }: UsePaginationProps) {
  return useMemo(() => {
    const totalPages = Math.ceil(users.length / itemsPerPage);
    const paginatedUsers = users.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    return {
      paginatedUsers,
      totalPages,
    };
  }, [users, currentPage, itemsPerPage]);
}