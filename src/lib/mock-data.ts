export type Priority = "P0" | "P1" | "P2";
export type IssueStatus = "open" | "in_progress" | "resolved" | "regressed";

export type Issue = {
  id: string;
  title: string;
  domain: string;
  priority: Priority;
  status: IssueStatus;
  reason: string;
  errorRate: number;
  scoreImpact: number;
};

export type Skill = {
  id: string;
  name: string;
  domain: "Math" | "Reading & Writing";
  mastery: number;
  freshness: number;
  lastPracticed: string;
  curve: number[];
};

export type ChangelogType = "fixed" | "regression" | "unlocked" | "narrowed";

export type ChangelogEntry = {
  id: string;
  type: ChangelogType;
  title: string;
  detail: string;
  date: string;
};

export const profile = {
  name: "Alex",
  initials: "AK",
  goalScore: 1450,
  examDate: "Nov 8, 2026",
  daysToExam: 98,
  currentInterval: [1240, 1310] as [number, number],
  previousInterval: [1190, 1340] as [number, number],
};

export const issues: Issue[] = [
  {
    id: "iss-1",
    title: "Quadratic word problems",
    domain: "Math · Algebra",
    priority: "P0",
    status: "regressed",
    reason: "12% of Math items depend on this · worth ~40 pts",
    errorRate: 0.62,
    scoreImpact: 40,
  },
  {
    id: "iss-2",
    title: "Comma splices",
    domain: "R&W · Grammar",
    priority: "P0",
    status: "in_progress",
    reason: "9 errors in the last 3 sessions · worth ~30 pts",
    errorRate: 0.48,
    scoreImpact: 30,
  },
  {
    id: "iss-3",
    title: "Circle theorems",
    domain: "Math · Geometry",
    priority: "P1",
    status: "open",
    reason: "High confidence, low accuracy — calibration gap",
    errorRate: 0.41,
    scoreImpact: 20,
  },
  {
    id: "iss-4",
    title: "Inference from paired texts",
    domain: "R&W · Reading",
    priority: "P1",
    status: "open",
    reason: "Slow: 118s avg vs 75s target",
    errorRate: 0.33,
    scoreImpact: 18,
  },
  {
    id: "iss-5",
    title: "Unit conversion",
    domain: "Math · Problem solving",
    priority: "P2",
    status: "resolved",
    reason: "0 errors in the last 8 attempts",
    errorRate: 0.05,
    scoreImpact: 6,
  },
];

export const sessionComposition = [
  { label: "Algebra", pct: 40, tone: "chart-1" },
  { label: "Grammar", pct: 30, tone: "chart-2" },
  { label: "Reading", pct: 20, tone: "chart-3" },
  { label: "Geometry", pct: 10, tone: "chart-5" },
];

const curve = (start: number, decay: number) =>
  Array.from({ length: 14 }, (_, i) => Math.max(6, Math.round(start * Math.exp(-decay * i))));

export const skills: Skill[] = [
  {
    id: "sk-1",
    name: "Comma usage",
    domain: "Reading & Writing",
    mastery: 74,
    freshness: 31,
    lastPracticed: "6 days ago",
    curve: curve(96, 0.085),
  },
  {
    id: "sk-2",
    name: "Quadratic equations",
    domain: "Math",
    mastery: 58,
    freshness: 24,
    lastPracticed: "8 days ago",
    curve: curve(92, 0.1),
  },
  {
    id: "sk-3",
    name: "Systems of equations",
    domain: "Math",
    mastery: 88,
    freshness: 79,
    lastPracticed: "yesterday",
    curve: curve(99, 0.018),
  },
  {
    id: "sk-4",
    name: "Subject–verb agreement",
    domain: "Reading & Writing",
    mastery: 91,
    freshness: 64,
    lastPracticed: "3 days ago",
    curve: curve(98, 0.032),
  },
  {
    id: "sk-5",
    name: "Circle theorems",
    domain: "Math",
    mastery: 46,
    freshness: 18,
    lastPracticed: "11 days ago",
    curve: curve(88, 0.12),
  },
  {
    id: "sk-6",
    name: "Rhetorical synthesis",
    domain: "Reading & Writing",
    mastery: 69,
    freshness: 52,
    lastPracticed: "4 days ago",
    curve: curve(95, 0.045),
  },
];

export const changelog: ChangelogEntry[] = [
  {
    id: "cl-1",
    type: "fixed",
    title: "Fixed: there / their / they're",
    detail: "6 errors over 2 weeks → 0 in the last week.",
    date: "Today, 09:14",
  },
  {
    id: "cl-2",
    type: "regression",
    title: "Regression: quadratic word problems",
    detail: "Accuracy dropped 71% → 44%. 4 spaced repetitions queued.",
    date: "Today, 09:14",
  },
  {
    id: "cl-3",
    type: "narrowed",
    title: "Score interval narrowed",
    detail: "1190–1340 → 1240–1310 (−80 pts of uncertainty).",
    date: "Yesterday",
  },
  {
    id: "cl-4",
    type: "unlocked",
    title: "Skill unlocked: Systems of equations",
    detail: "Mastery crossed 85% with stable retention.",
    date: "Jul 29",
  },
  {
    id: "cl-5",
    type: "fixed",
    title: "Fixed: unit conversion slips",
    detail: "0 errors in the last 8 attempts. Issue closed.",
    date: "Jul 27",
  },
];

export const calibration = [
  { topic: "Geometry", confidence: 88, accuracy: 42, n: 24 },
  { topic: "Algebra", confidence: 74, accuracy: 61, n: 41 },
  { topic: "Grammar", confidence: 38, accuracy: 86, n: 52 },
  { topic: "Reading", confidence: 55, accuracy: 58, n: 33 },
  { topic: "Data analysis", confidence: 62, accuracy: 71, n: 19 },
  { topic: "Punctuation", confidence: 44, accuracy: 79, n: 28 },
];

export const calibrationNotes = [
  "You're confident but wrong in Geometry — slow down before answering.",
  "You underrate yourself in Grammar. Trust the first instinct.",
  "Algebra is well calibrated. No action needed.",
];

export const intervalHistory = [
  { week: "W1", low: 1080, high: 1390 },
  { week: "W2", low: 1120, high: 1370 },
  { week: "W3", low: 1160, high: 1355 },
  { week: "W4", low: 1190, high: 1340 },
  { week: "W5", low: 1215, high: 1325 },
  { week: "W6", low: 1240, high: 1310 },
];

export type Question = {
  id: string;
  domain: string;
  skill: string;
  prompt: string;
  choices: string[];
  correct: number;
  rationale: string;
};

export const sessionQuestions: Question[] = [
  {
    id: "q1",
    domain: "Math · Algebra",
    skill: "Quadratic word problems",
    prompt:
      "A ball is thrown upward so that its height is h(t) = −16t² + 48t + 4. After how many seconds does it reach maximum height?",
    choices: ["1.0 s", "1.5 s", "2.0 s", "3.0 s"],
    correct: 1,
    rationale:
      "The vertex of a parabola sits at t = −b / (2a) = −48 / (2 · −16) = 1.5. No factoring needed — recognizing the vertex form is the whole task.",
  },
  {
    id: "q2",
    domain: "R&W · Grammar",
    skill: "Comma splices",
    prompt:
      "Choose the option that makes the sentence conform to standard English: “The rover collected samples for weeks ___ the results surprised the team.”",
    choices: [", ", ", and", "; however", " which"],
    correct: 1,
    rationale:
      "Two independent clauses need a coordinating conjunction after the comma. A bare comma creates a splice; “; however” needs a comma after however.",
  },
  {
    id: "q3",
    domain: "Math · Geometry",
    skill: "Circle theorems",
    prompt:
      "In a circle, an inscribed angle intercepts an arc of 110°. What is the measure of the inscribed angle?",
    choices: ["37.5°", "55°", "70°", "110°"],
    correct: 1,
    rationale: "An inscribed angle is always half of its intercepted arc: 110 / 2 = 55°.",
  },
];

export const hypothesisChips = [
  "Misread the question",
  "Arithmetic slip",
  "Didn't know the rule",
  "Ran out of time",
];

export const aiQuickChips = [
  "Explain simpler",
  "Give me the formula",
  "Show an example",
  "Similar question",
];

export const aiThread = [
  {
    role: "user" as const,
    text: "Why is the vertex formula t = -b/2a and not something with the discriminant?",
  },
  {
    role: "assistant" as const,
    text: "The discriminant tells you where the parabola crosses zero. The vertex is the midpoint between those two roots — averaging them gives (-b+√D)/2a and (-b-√D)/2a → -b/2a. So the vertex formula is just the average of the roots, with the discriminant cancelling out.",
  },
];
