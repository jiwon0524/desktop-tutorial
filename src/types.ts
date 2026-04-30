export type Question = {
  type: string;
  difficulty: string;
  prompt: string;
  choices: string[];
  answer: number;
  explanation: string;
  concept: string;
};

export type Subject = {
  id: string;
  title: string;
  field: string;
  exam: string;
  progress: number;
  readiness: number;
  color: "blue" | "green" | "teal" | "orange" | "purple";
  template: string;
  materials: string[];
  concepts: string[];
  weak: string;
  question: Question;
};

export type WrongNote = {
  subject: string;
  concept: string;
  mine: string;
  answer: string;
  reason: string;
};

export type TabId =
  | "overview"
  | "materials"
  | "notes"
  | "concepts"
  | "variants"
  | "solve"
  | "wrong"
  | "review"
  | "alerts"
  | "download";
