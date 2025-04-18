"use client";
import { User } from '@/types/leaderboard';
import { useCallback } from 'react';

interface ScrollToUserOptions {
  currentUser: User | null;
  filteredUsers: User[];
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
}

export function useScrollToUser({
  currentUser,
  filteredUsers,
  itemsPerPage,
  setCurrentPage,
}: ScrollToUserOptions) {
  return useCallback(() => {
    const userIndex = filteredUsers.findIndex(u => u.id === currentUser?.id);
    
    if (userIndex === -1) return;
    
    const userPage = Math.floor(userIndex / itemsPerPage) + 1;
    
    setCurrentPage(userPage);
    
    setTimeout(() => {
      const element = currentUser ? document.getElementById(currentUser.username) : null;
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        element.classList.add('bg-blue-500/20');
        setTimeout(() => {
          element.classList.remove('bg-blue-500/20', 'transition-colors');
        }, 2000);
      }
    }, 100);
  }, [currentUser, filteredUsers, itemsPerPage, setCurrentPage]);
}