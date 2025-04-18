"use client";
import { ArrowUp, ArrowDown, Minus, ChevronsUp, ChevronsDown } from 'lucide-react';

interface RankChangeIndicatorProps {
  previousRank: number;
  currentRank: number;
}

export function RankChangeIndicator({ previousRank, currentRank }: RankChangeIndicatorProps) {
  const rankDifference = previousRank - currentRank;
  const getRankChangeDisplay = () => {
    if (rankDifference === 0) {
      return {
        icon: Minus,
        color: 'text-gray-400',
        tooltip: 'No change in rank'
      };
    }
    
    if (rankDifference > 50) {
      return {
        icon: ChevronsUp,
        color: 'text-emerald-400',
        tooltip: `Jumped up ${rankDifference} positions!`
      };
    }
    
    if (rankDifference > 0) {
      return {
        icon: ArrowUp,
        color: 'text-green-400',
        tooltip: `Moved up ${rankDifference} positions`
      };
    }
    
    if (rankDifference < -50) {
      return {
        icon: ChevronsDown,
        color: 'text-red-400',
        tooltip: `Dropped ${Math.abs(rankDifference)} positions!`
      };
    }
    
    return {
      icon: ArrowDown,
      color: 'text-orange-400',
      tooltip: `Moved down ${Math.abs(rankDifference)} positions`
    };
  };

  const { icon: Icon, color, tooltip } = getRankChangeDisplay();

  return (
    <div className="group relative">
      <div className={`flex items-center gap-1 ${color} transition-colors`}>
        <Icon className="w-4 h-4" />
        <span className="text-sm font-medium">
          {rankDifference !== 0 && Math.abs(rankDifference)}
        </span>
      </div>
      <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-800 text-xs text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {tooltip}
      </div>
    </div>
  );
}