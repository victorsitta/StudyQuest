export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

export interface Phase {
  id: number;
  title: string;
  subject: string;
  unlocked: boolean;
  completed: boolean;
}

export interface Badge {
  id: number;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface UserData {
  name: string;
  avatar: string;
  level: number;
  xp: number;
  maxXp: number;
}
