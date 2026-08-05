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
  lastName: "Kim",
  initials: "AK",
  email: "alex.kim@gmail.com",
  role: "Student",
  school: "Northgate High School",
  graduationClass: "Class of 2028",
  joinedDate: "Joined March 14, 2026",
  plan: "free" as "free" | "pro",
  goalScore: 1450,
  examDate: "Nov 8, 2026",
  daysToExam: 98,
  currentInterval: [1240, 1310] as [number, number],
  previousInterval: [1190, 1340] as [number, number],
};

/* ---------- Question bank picker ---------- */
export type Subject = "math" | "english";

export const topicBank: Record<Subject, { id: string; label: string; count: number }[]> = {
  math: [
    { id: "algebra", label: "Linear equations", count: 148 },
    { id: "quadratics", label: "Quadratics", count: 122 },
    { id: "systems", label: "Systems of equations", count: 96 },
    { id: "geometry", label: "Geometry & trig", count: 134 },
    { id: "circles", label: "Circle theorems", count: 61 },
    { id: "data", label: "Data analysis", count: 118 },
    { id: "ratios", label: "Ratios & percentages", count: 87 },
    { id: "functions", label: "Nonlinear functions", count: 104 },
  ],
  english: [
    { id: "grammar", label: "Punctuation & commas", count: 142 },
    { id: "sva", label: "Subject–verb agreement", count: 88 },
    { id: "transitions", label: "Transitions", count: 76 },
    { id: "inference", label: "Inference", count: 131 },
    { id: "evidence", label: "Command of evidence", count: 119 },
    { id: "vocab", label: "Words in context", count: 156 },
    { id: "synthesis", label: "Rhetorical synthesis", count: 69 },
    { id: "structure", label: "Text structure", count: 58 },
  ],
};

export const difficulties = [
  { id: "easy", label: "Easy", tone: "chart-2" },
  { id: "medium", label: "Medium", tone: "chart-3" },
  { id: "hard", label: "Hard", tone: "chart-4" },
  { id: "adaptive", label: "Adaptive", tone: "chart-1" },
] as const;

/* ---------- Vocabulary ---------- */
export type VocabWord = {
  word: string;
  definition: string;
  difficulty: 1 | 2 | 3;
  retention: number;
  source: "sat" | "mine";
};

export const vocabWords: VocabWord[] = [
  { word: "Laconic", definition: "using very few words", difficulty: 3, retention: 22, source: "sat" },
  { word: "Equivocate", definition: "to speak ambiguously to conceal the truth", difficulty: 3, retention: 31, source: "sat" },
  { word: "Ameliorate", definition: "to make something better", difficulty: 2, retention: 48, source: "sat" },
  { word: "Prosaic", definition: "commonplace, unromantic", difficulty: 3, retention: 66, source: "sat" },
  { word: "Obdurate", definition: "stubbornly refusing to change an opinion", difficulty: 3, retention: 81, source: "mine" },
  { word: "Candid", definition: "truthful and straightforward", difficulty: 1, retention: 74, source: "sat" },
  { word: "Diligent", definition: "showing careful and persistent effort", difficulty: 1, retention: 88, source: "sat" },
  { word: "Ubiquitous", definition: "present everywhere at once", difficulty: 2, retention: 57, source: "sat" },
  { word: "Pragmatic", definition: "dealing with things realistically", difficulty: 2, retention: 69, source: "sat" },
  { word: "Ephemeral", definition: "lasting for a very short time", difficulty: 2, retention: 35, source: "mine" },
  { word: "Alleviate", definition: "to make suffering less severe", difficulty: 1, retention: 79, source: "sat" },
  { word: "Nuanced", definition: "characterized by subtle distinctions", difficulty: 2, retention: 62, source: "sat" },
  { word: "Intransigent", definition: "unwilling to compromise", difficulty: 3, retention: 27, source: "sat" },
  { word: "Substantiate", definition: "to support a claim with evidence", difficulty: 2, retention: 51, source: "sat" },
  { word: "Innocuous", definition: "not harmful or offensive", difficulty: 2, retention: 44, source: "sat" },
  { word: "Meticulous", definition: "showing great attention to detail", difficulty: 1, retention: 83, source: "sat" },
  { word: "Perfunctory", definition: "done without real interest or care", difficulty: 3, retention: 29, source: "mine" },
  { word: "Tenacious", definition: "holding firmly, persistent", difficulty: 1, retention: 71, source: "sat" },
  { word: "Anomaly", definition: "something that deviates from the norm", difficulty: 1, retention: 90, source: "sat" },
  { word: "Vindicate", definition: "to clear of blame or suspicion", difficulty: 2, retention: 39, source: "sat" },
  { word: "Esoteric", definition: "understood by only a small group", difficulty: 3, retention: 33, source: "sat" },
  { word: "Empirical", definition: "based on observation rather than theory", difficulty: 2, retention: 64, source: "sat" },
  { word: "Reticent", definition: "reluctant to speak openly", difficulty: 3, retention: 41, source: "sat" },
  { word: "Cogent", definition: "clear, logical and convincing", difficulty: 3, retention: 25, source: "mine" },
  { word: "Discern", definition: "to perceive or recognize clearly", difficulty: 1, retention: 86, source: "sat" },
  { word: "Placate", definition: "to calm someone's anger", difficulty: 2, retention: 55, source: "sat" },
  { word: "Superfluous", definition: "more than is needed", difficulty: 2, retention: 47, source: "sat" },
  { word: "Advocate", definition: "to publicly support a cause", difficulty: 1, retention: 92, source: "sat" },
  { word: "Undermine", definition: "to weaken gradually", difficulty: 1, retention: 78, source: "sat" },
  { word: "Zealous", definition: "showing great energy for a cause", difficulty: 2, retention: 59, source: "sat" },
];

/* ---------- Full-length test ---------- */
export const fullTestModules = [
  { id: "rw1", name: "Reading & Writing · Module 1", questions: 27, minutes: 32 },
  { id: "rw2", name: "Reading & Writing · Module 2", questions: 27, minutes: 32 },
  { id: "break", name: "Break", questions: 0, minutes: 10 },
  { id: "m1", name: "Math · Module 1", questions: 22, minutes: 35 },
  { id: "m2", name: "Math · Module 2", questions: 22, minutes: 35 },
];

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

/* ---------- Untimed practice bank ---------- */
export type PracticeDifficulty = "easy" | "medium" | "hard";

export type PracticeQuestion = {
  id: string;
  subject: Subject;
  topic: string;
  difficulty: PracticeDifficulty;
  prompt: string;
  choices: string[];
  correct: number;
  explanation: string;
};

export const practiceBank: PracticeQuestion[] = [
  {
    id: "p1",
    subject: "math",
    topic: "algebra",
    difficulty: "easy",
    prompt: "If 4x − 7 = 21, what is the value of x?",
    choices: ["3.5", "5", "7", "14"],
    correct: 2,
    explanation:
      "Add 7 to both sides: 4x = 28. Divide by 4: x = 7. Always isolate the variable term before dividing.",
  },
  {
    id: "p2",
    subject: "math",
    topic: "algebra",
    difficulty: "medium",
    prompt:
      "A line passes through (2, 5) and (6, 13). What is the equation of the line in slope-intercept form?",
    choices: ["y = 2x + 1", "y = 2x − 1", "y = 4x − 3", "y = 0.5x + 4"],
    correct: 0,
    explanation:
      "Slope = (13 − 5) / (6 − 2) = 2. Substitute (2, 5): 5 = 2·2 + b → b = 1. So y = 2x + 1.",
  },
  {
    id: "p3",
    subject: "math",
    topic: "quadratics",
    difficulty: "medium",
    prompt: "What are the solutions to x² + 5x − 14 = 0?",
    choices: ["x = −7 or x = 2", "x = 7 or x = −2", "x = −7 or x = −2", "x = 14 or x = −1"],
    correct: 0,
    explanation:
      "Find two numbers with product −14 and sum 5: 7 and −2. Factor: (x + 7)(x − 2) = 0, so x = −7 or x = 2.",
  },
  {
    id: "p4",
    subject: "math",
    topic: "quadratics",
    difficulty: "hard",
    prompt:
      "A ball's height is h(t) = −16t² + 48t + 4. After how many seconds does it reach its maximum height?",
    choices: ["1.0 s", "1.5 s", "2.0 s", "3.0 s"],
    correct: 1,
    explanation:
      "The vertex of a parabola is at t = −b / (2a) = −48 / (2 · −16) = 1.5 s. No factoring needed — recognising the vertex is the whole task.",
  },
  {
    id: "p5",
    subject: "math",
    topic: "systems",
    difficulty: "medium",
    prompt: "If 3x + y = 11 and x − y = 1, what is x + y?",
    choices: ["3", "5", "6", "8"],
    correct: 1,
    explanation:
      "Add the equations: 4x = 12 → x = 3. Then y = x − 1 = 2. So x + y = 5.",
  },
  {
    id: "p6",
    subject: "math",
    topic: "circles",
    difficulty: "hard",
    prompt: "An inscribed angle intercepts an arc of 110°. What is the measure of the angle?",
    choices: ["37.5°", "55°", "70°", "110°"],
    correct: 1,
    explanation: "An inscribed angle is always half of its intercepted arc: 110 / 2 = 55°.",
  },
  {
    id: "p7",
    subject: "math",
    topic: "ratios",
    difficulty: "easy",
    prompt: "A jacket costs $80 after a 20% discount. What was the original price?",
    choices: ["$96", "$100", "$104", "$120"],
    correct: 1,
    explanation:
      "$80 is 80% of the original: 0.8p = 80 → p = 100. Never add 20% back to the sale price — the percentage is taken from the original.",
  },
  {
    id: "p8",
    subject: "math",
    topic: "data",
    difficulty: "easy",
    prompt: "The mean of 5 numbers is 12. Four of them are 8, 10, 14 and 16. What is the fifth?",
    choices: ["10", "12", "14", "60"],
    correct: 1,
    explanation: "Total must be 5 · 12 = 60. The four given sum to 48, so the fifth is 12.",
  },
  {
    id: "p9",
    subject: "math",
    topic: "geometry",
    difficulty: "medium",
    prompt: "A right triangle has legs 9 and 12. What is the length of the hypotenuse?",
    choices: ["13", "15", "18", "21"],
    correct: 1,
    explanation: "9-12-15 is a 3-4-5 triangle scaled by 3: √(81 + 144) = √225 = 15.",
  },
  {
    id: "p10",
    subject: "math",
    topic: "functions",
    difficulty: "hard",
    prompt: "If f(x) = 2x² − 3x, what is f(−2)?",
    choices: ["2", "8", "14", "−14"],
    correct: 2,
    explanation:
      "f(−2) = 2(−2)² − 3(−2) = 2·4 + 6 = 14. The square makes the first term positive; the double negative makes the second positive too.",
  },
  {
    id: "p11",
    subject: "english",
    topic: "grammar",
    difficulty: "medium",
    prompt:
      "The rover collected samples for weeks ___ the results surprised the entire team. Which choice is correct?",
    choices: [", ", ", and", "; however", " which"],
    correct: 1,
    explanation:
      "Two independent clauses need a coordinating conjunction after the comma. A bare comma creates a splice, and “; however” would need a comma after “however”.",
  },
  {
    id: "p12",
    subject: "english",
    topic: "sva",
    difficulty: "easy",
    prompt: "The collection of rare manuscripts ___ kept in a climate-controlled vault.",
    choices: ["are", "is", "were", "have been"],
    correct: 1,
    explanation:
      "The subject is “collection”, not “manuscripts”. Prepositional phrases never change the number of the subject, so the verb is singular: “is”.",
  },
  {
    id: "p13",
    subject: "english",
    topic: "sva",
    difficulty: "hard",
    prompt:
      "Neither the coach nor the players ___ satisfied with the outcome of the final match.",
    choices: ["was", "were", "has been", "is"],
    correct: 1,
    explanation:
      "With “neither … nor”, the verb agrees with the nearer subject — “players” — so the plural “were” is correct.",
  },
  {
    id: "p14",
    subject: "english",
    topic: "transitions",
    difficulty: "medium",
    prompt:
      "The study used a small sample. ___, its conclusions should be treated as preliminary.",
    choices: ["Similarly", "Therefore", "Nevertheless", "For example"],
    correct: 1,
    explanation:
      "The second sentence is a consequence of the first, so a cause-effect transition is needed. “Therefore” fits; contrast and example words do not.",
  },
  {
    id: "p15",
    subject: "english",
    topic: "inference",
    difficulty: "hard",
    prompt:
      "A researcher notes that the fossil shows wear consistent with chewing tough plants, yet its jaw muscles were weak. This most strongly suggests that the animal ___",
    choices: [
      "hunted other animals",
      "relied on food that required little bite force",
      "processed tough plants slowly over long feeding periods",
      "did not use its teeth at all",
    ],
    correct: 2,
    explanation:
      "The inference has to honour both facts: tough-plant wear (so it did eat them) and weak muscles (so not by force). Long, slow feeding reconciles the two; the other options discard one fact.",
  },
  {
    id: "p16",
    subject: "english",
    topic: "evidence",
    difficulty: "medium",
    prompt:
      "Which finding would most strongly support the claim that urban gardens lower neighbourhood temperatures?",
    choices: [
      "Residents report enjoying the gardens.",
      "Blocks with gardens measured 2.1 °C cooler than blocks without.",
      "Garden plots increased local property values.",
      "More vegetables were harvested than expected.",
    ],
    correct: 1,
    explanation:
      "Evidence must match the claim's measurement. Only the temperature comparison speaks to temperature; the rest are about different outcomes.",
  },
  {
    id: "p17",
    subject: "english",
    topic: "vocab",
    difficulty: "easy",
    prompt:
      "As used in the sentence “Her account of the accident was candid”, “candid” most nearly means:",
    choices: ["hesitant", "honest", "detailed", "polite"],
    correct: 1,
    explanation:
      "“Candid” means truthful and straightforward. Words-in-context questions reward the plainest fit, not the most impressive synonym.",
  },
  {
    id: "p18",
    subject: "english",
    topic: "synthesis",
    difficulty: "hard",
    prompt:
      "The writer wants to emphasise that the two experiments produced conflicting results. Which choice best accomplishes this?",
    choices: [
      "Both experiments were carried out in 2019.",
      "The first found a strong effect, while the second found none at all.",
      "The experiments used similar equipment.",
      "The results were published in separate journals.",
    ],
    correct: 1,
    explanation:
      "Rhetorical synthesis asks you to serve the stated goal. Only the second option puts the two outcomes side by side and shows the conflict.",
  },
  {
    id: "p19",
    subject: "english",
    topic: "structure",
    difficulty: "medium",
    prompt: "The main purpose of a paragraph that opens with a counterargument is usually to:",
    choices: [
      "confuse the reader",
      "set up a rebuttal that strengthens the writer's position",
      "change the topic",
      "summarise the passage",
    ],
    correct: 1,
    explanation:
      "Writers raise objections in order to answer them. Naming the counterargument first makes the rebuttal that follows more convincing.",
  },
  {
    id: "p20",
    subject: "english",
    topic: "grammar",
    difficulty: "hard",
    prompt:
      "Select the correctly punctuated option: “The exhibit features three artists ___ a sculptor, a painter and a printmaker.”",
    choices: [", ", ": ", "; ", " and"],
    correct: 1,
    explanation:
      "A complete sentence followed by a list takes a colon. A comma would be too weak, and a semicolon requires a second independent clause.",
  },
];

export function getPracticeQuestions(
  subject: Subject,
  topics: string[],
  difficulty: PracticeDifficulty | "all",
) {
  const byTopic = practiceBank.filter(
    (q) => q.subject === subject && (topics.length === 0 || topics.includes(q.topic)),
  );
  const byDifficulty =
    difficulty === "all" ? byTopic : byTopic.filter((q) => q.difficulty === difficulty);
  return byDifficulty.length ? byDifficulty : byTopic.length ? byTopic : practiceBank.filter((q) => q.subject === subject);
}

export const difficultyTone: Record<PracticeDifficulty, string> = {
  easy: "chart-2",
  medium: "chart-3",
  hard: "chart-4",
};

export type Friend = {
  id: string;
  name: string;
  initials: string;
  school: string;
  solvedToday: number;
  streakDays: number;
  accuracy: number;
  interval: [number, number];
  lastActive: string;
  tone: string;
};

export const friends: Friend[] = [
  {
    id: "f1",
    name: "Dana Yerlan",
    initials: "DY",
    school: "NIS Almaty",
    solvedToday: 42,
    streakDays: 12,
    accuracy: 81,
    interval: [1350, 1420],
    lastActive: "12 min ago",
    tone: "chart-2",
  },
  {
    id: "f2",
    name: "Miras Bek",
    initials: "MB",
    school: "Haileybury",
    solvedToday: 28,
    streakDays: 6,
    accuracy: 74,
    interval: [1240, 1330],
    lastActive: "1 h ago",
    tone: "chart-1",
  },
  {
    id: "f3",
    name: "Sofia Chen",
    initials: "SC",
    school: "QSI International",
    solvedToday: 17,
    streakDays: 21,
    accuracy: 88,
    interval: [1420, 1480],
    lastActive: "just now",
    tone: "chart-5",
  },
  {
    id: "f4",
    name: "Aruzhan T.",
    initials: "AT",
    school: "NIS Astana",
    solvedToday: 9,
    streakDays: 3,
    accuracy: 69,
    interval: [1150, 1250],
    lastActive: "4 h ago",
    tone: "chart-3",
  },
  {
    id: "f5",
    name: "Timur K.",
    initials: "TK",
    school: "Miras",
    solvedToday: 0,
    streakDays: 0,
    accuracy: 63,
    interval: [1080, 1190],
    lastActive: "yesterday",
    tone: "chart-4",
  },
];

export const friendRequests = [
  { id: "r1", name: "Alina Sarsen", initials: "AS", mutual: 3 },
  { id: "r2", name: "Nurlan D.", initials: "ND", mutual: 1 },
];

export const myToday = { solvedToday: 24, streakDays: 8, accuracy: 77 };

export const profileStats = [
  { label: "Questions solved", value: "1,284", tone: "chart-1" },
  { label: "Accuracy", value: "77%", tone: "chart-2" },
  { label: "Hours practiced", value: "46.5", tone: "chart-5" },
  { label: "Day streak", value: "8", tone: "chart-3" },
];
