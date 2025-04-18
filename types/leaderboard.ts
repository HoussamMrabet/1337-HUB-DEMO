export interface User {
  id: string;
  fullName: string;
  username: string;
  level: number;
  levelProgress: number;
  campus: string;
  country: string;
  coalition: {
    id: number;
    name: string;
    img: string;
    color: string;
  };
  rank: number;
  previousRank: number;
  avatar: string;
  achievements: string[];
  startYear: string;
  alumni: boolean;
}

export interface FilterOptions {
  coalitions: string[];
  campuses: string[];
  years: string[];
}