
export interface Message {
  id: number;
  sender: 'coach' | 'client';
  text: string;
  time: string;
}

export interface Document {
  id: number;
  name: string;
  type: string;
  date: string;
  description: string;
}

export interface Survey {
  id: number;
  name: string;
  completed: boolean;
  date: string;
  progress: number;
  questions: number;
}

export interface SessionSummary {
  id: number;
  date: string;
  summary: string;
  keyTakeaways: string[];
}

export interface Goal {
  id: number;
  text: string;
  progress: number;
  category: 'work' | 'mind' | 'body';
}

export interface CompassGoals {
  work: Goal[];
  mind: Goal[];
  body: Goal[];
}
