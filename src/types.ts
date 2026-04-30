export type Question = {
  type: string;
  difficulty: string;
  prompt: string;
  choices: string[];
  answer: number;
  explanation: string;
  concept: string;
};

export type Resource = {
  title: string;
  provider: string;
  kind: string;
  level: string;
  language: string;
  license: string;
  note: string;
};

export type Flashcard = {
  front: string;
  back: string;
};

export type StudyTask = {
  day: string;
  title: string;
  detail: string;
};

export type Subject = {
  id: string;
  title: string;
  field: string;
  group: string;
  exam: string;
  progress: number;
  readiness: number;
  color: "blue" | "green" | "teal" | "orange" | "purple";
  template: string;
  materials: string[];
  concepts: string[];
  weak: string;
  question: Question;
  resources: Resource[];
  flashcards: Flashcard[];
  plan: StudyTask[];
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
  | "analyze"
  | "resources"
  | "notes"
  | "concepts"
  | "flashcards"
  | "variants"
  | "solve"
  | "wrong"
  | "review"
  | "alerts"
  | "download";
