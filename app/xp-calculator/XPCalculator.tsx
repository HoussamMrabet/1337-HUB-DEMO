"use client"
import { useEffect, useState } from 'react';
import { XPEntry, XPState } from '@/types/xp';
import { calculateProjectXP, levelsXp, mockProjects } from '@/utils/xpCalculations';
import { XPSummary } from '@/components/xp/XPSummary';
import { ProjectForm } from '@/components/xp/ProjectForm';
import { ProjectList } from '@/components/xp/ProjectList';
import { Profile } from '@/hooks/useUser';
import { Calculator } from 'lucide-react';

const DEFAULT_LEVEL = 1;

export function XPCalculator({me} : {me: Profile}) {
  const [defaultLevel, setDefaultLevel] = useState<number>(0);
  const [state, setState] = useState<XPState>({
    initialLevel: DEFAULT_LEVEL,
    entries: [],
  });

  useEffect(() => {
    const currentLevel = me?.cursus_users?.find(c => c.cursus_id == 21)?.level || 0;
    setDefaultLevel(currentLevel);
    setState({initialLevel: currentLevel, entries: []});
  }, [me]);

  const calculateLevelFromXP = (totalXP: number): number => {
    let level = 0;
    let nextLevelXP = 0;

    for (let i = 1; i < levelsXp.length; i++) {
      if (totalXP < levelsXp[i]) {
        level = i - 1;
        nextLevelXP = levelsXp[i];
        break;
      }
    }

    if (totalXP >= levelsXp[levelsXp.length - 1]) {
      level = levelsXp.length - 1;
      nextLevelXP = levelsXp[levelsXp.length - 1];
    }

    const progress = nextLevelXP > 0 ? (totalXP - levelsXp[level]) / (nextLevelXP - levelsXp[level]) : 0;

    return parseFloat((level + progress).toFixed(2));
  };

  const calculateXPFromLevel = (level: number): number => {
    const baseLevel = Math.floor(level);
    const progress = level - baseLevel;

    if (baseLevel >= levelsXp.length - 1) return levelsXp[levelsXp.length - 1];

    const baseXP = levelsXp[baseLevel];
    const nextXP = levelsXp[baseLevel + 1];

    return baseXP + progress * (nextXP - baseXP);
  };

  const handleAddProject = (projectId: string, score: number, hasBonus: boolean) => {
    const project = mockProjects.find((p) => p.id === projectId);
    if (!project) return;

    const totalXP = calculateProjectXP(project, score, hasBonus);
    const newEntry: XPEntry = {
      id: crypto.randomUUID(),
      projectId,
      score,
      hasBonus,
      totalXP,
    };

    const totalXPFromEntries = state.entries.reduce((sum, entry) => sum + entry.totalXP, 0) + totalXP;
    const newLevel = calculateLevelFromXP(totalXPFromEntries + calculateXPFromLevel(defaultLevel));

    setState((prev) => ({
      ...prev,
      entries: [...prev.entries, newEntry],
      initialLevel: newLevel,
    }));
  };

  const handleRemoveProject = (id: string) => {
    const entryToRemove = state.entries.find((entry) => entry.id === id);
    if (!entryToRemove) return;

    const newEntries = state.entries.filter((entry) => entry.id !== id);
    const totalXPFromEntries = newEntries.reduce((sum, entry) => sum + entry.totalXP, 0);

    const newLevel = calculateLevelFromXP(totalXPFromEntries + calculateXPFromLevel(defaultLevel));

    setState((prev) => ({
      ...prev,
      entries: newEntries,
      initialLevel: newLevel,
    }));
  };

  const handleInitialLevelChange = (level: number) => {
    const totalXP = calculateXPFromLevel(level);

    setState((prev) => ({
      ...prev,
      initialLevel: level,
      entries: prev.entries.map((entry) => ({ ...entry, totalXP })), // Update total XP
    }));
  };

  const handleReset = () => {
    const currentLevel = me?.cursus_users?.find(c => c.cursus_id == 21)?.level || 0;
    setDefaultLevel(currentLevel);
    setState({
      initialLevel: currentLevel,
      entries: [],
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
          <Calculator className="w-8 h-8 text-blue-400" />
          <h1 className="text-3xl sm:text-4xl font-bold text-white">XP Calculator</h1>
        </div>
        
        <div className="grid gap-8">
          <XPSummary 
            defaultLevel={defaultLevel}
            setDefaultLevel={setDefaultLevel}
            entries={state.entries}
            initialLevel={state.initialLevel}
            onInitialLevelChange={handleInitialLevelChange}
            onReset={handleReset}
          />
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 z-50">
            <h2 className="text-xl font-semibold text-white mb-4">Add Project</h2>
            <ProjectForm projects={mockProjects} onSubmit={handleAddProject} />
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Project History</h2>
            <ProjectList entries={state.entries} onRemove={handleRemoveProject} />
          </div>
        </div>
      </div>
    </div>
  );
}
