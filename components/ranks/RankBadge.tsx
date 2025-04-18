"use client";
import { Crown, Trophy, Medal } from 'lucide-react';

interface RankBadgeProps {
  rank: number;
}

export function RankBadge({ rank }: RankBadgeProps) {
  if (rank === 1) {
    return (
      <div className="relative w-8 h-8 flex items-center justify-center">
        <div className="absolute inset-0 bg-yellow-500/20 rounded-lg blur-sm" />
        <Crown className="w-6 h-6 text-yellow-400" />
      </div>
    );
  }

  if (rank === 2) {
    return (
      <div className="relative w-8 h-8 flex items-center justify-center">
        <div className="absolute inset-0 bg-gray-400/20 rounded-lg blur-sm" />
        <Trophy className="w-6 h-6 text-gray-300" />
      </div>
    );
  }

  if (rank === 3) {
    return (
      <div className="relative w-8 h-8 flex items-center justify-center">
        <div className="absolute inset-0 bg-amber-700/20 rounded-lg blur-sm" />
        <Medal className="w-6 h-6 text-amber-700" />
      </div>
    );
  }

  return (
    <span className="w-8 text-center font-bold text-gray-400 group-hover:text-white">
      {rank}
    </span>
  );
}