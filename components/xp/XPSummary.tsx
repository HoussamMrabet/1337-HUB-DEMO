"use client";
import { useEffect, useState } from 'react';
import { LevelInput } from './LevelInput';
import { RotateCcw, Sparkles } from 'lucide-react';
import { XPEntry } from '@/types/xp';
import { calculateTotalXP, levelsXp } from '@/utils/xpCalculations';

interface XPSummaryProps {
  defaultLevel: number;
  setDefaultLevel: React.Dispatch<React.SetStateAction<number>>;
  entries: XPEntry[];
  initialLevel: number;
  onInitialLevelChange: (level: number) => void;
  onReset: () => void;
}

const calculateXPFromLevel = (level: number): number => {
  const baseLevel = Math.floor(level);
  const progress = level - baseLevel;

  if (baseLevel >= levelsXp.length - 1) return levelsXp[levelsXp.length - 1];

  const baseXP = levelsXp[baseLevel];
  const nextXP = levelsXp[baseLevel + 1];

  return baseXP + progress * (nextXP - baseXP);
};

export function XPSummary({ defaultLevel, setDefaultLevel, entries, initialLevel, onInitialLevelChange, onReset }: XPSummaryProps) {
  const [totalXP, setTotalXP] = useState(0);

  useEffect(() => {
    const xp = calculateTotalXP(entries) + calculateXPFromLevel(defaultLevel);

    setTotalXP(xp);
  }, [entries, defaultLevel])
  
  const isReadonly = entries.length > 0;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-800/30">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      
      <div className="relative grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-medium text-blue-300 mb-4">
            <Sparkles className="w-5 h-5" />
            Current Level
          </h3>
          <div className="flex gap-2">
            <LevelInput 
              setDefaultLevel={setDefaultLevel}
              level={initialLevel}
              onChange={onInitialLevelChange} 
              isReadonly={isReadonly}
            />
            <button
              onClick={onReset}
              className="px-3 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              title="Reset to default level"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="flex flex-col justify-center items-end">
          <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            {initialLevel.toFixed(2)}
          </div>
          <p className="text-blue-300 mt-2">
            Total XP: {totalXP.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
