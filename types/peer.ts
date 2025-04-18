export type TeamStatus =  'in_progress' | 'creating_group';

export interface User {
  id: string;
  name: string;
  avatar: string;
  campus: string;
  level: number;
}

export interface Team {
  id: string;
  name: string;
  status: TeamStatus;
  users: User[];
  startDate: string;
  endDate?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  teams: Team[];
}