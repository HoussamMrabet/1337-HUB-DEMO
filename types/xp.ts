export interface Project {
  id: string;
  name: string;
  baseXP: number;
}

export interface XPEntry {
  id: string;
  projectId: string;
  score: number;
  hasBonus: boolean;
  totalXP: number;
}

export interface XPState {
  initialLevel: number;
  entries: XPEntry[];
}