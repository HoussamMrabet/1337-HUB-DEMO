export interface Project {
  project_id: number;
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  baseXP: number;
  teamSize: {
    min: number;
    max: number;
  };
  oldSubject?: string;
  subjectUrl: string;
  status: 'not_started' | 'in_progress' | 'completed';
  tags: string[];
  updatedAt: string;
}