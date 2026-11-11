export type Department = 'CSE' | 'ECE' | 'MECH' | 'COE' | 'EE' | 'CIVIL';
export type ExamType = 'MST-1' | 'MST-2' | 'EST' | 'QUIZ';
export type AcademicYear = '2024' | '2023' | '2022' | '2021';

export interface Solution {
  id: string;
  authorName: string;
  authorRoll: string;
  authorBadge: 'Professor Verified' | 'Top 1% Senior TA' | 'Peer Top-Voted' | 'Student Contributor';
  verified: boolean;
  upvotes: number;
  downvotes: number;
  userVote?: 'up' | 'down';
  postedDate: string;
  stepByStep: string[];
  finalAnswer: string;
  keyFormulas: string[];
  tips: string;
}

export interface PYQPaper {
  id: string;
  courseCode: string;
  courseTitle: string;
  department: Department;
  semester: number;
  examType: ExamType;
  year: AcademicYear;
  credits: number;
  totalMarks: number;
  timeLimitMins: number;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Hardcore';
  questionsCount: number;
  hasVerifiedSolution: boolean;
  views: number;
  downloads: number;
  bookmarked?: boolean;
  syllabusModule: string;
  questions: {
    qNum: string;
    marks: number;
    prompt: string;
    latexFormula?: string;
    solutions: Solution[];
  }[];
}

export interface FormulaSnippet {
  id: string;
  title: string;
  category: 'Algorithms & DS' | 'Signal Processing' | 'Thermodynamics' | 'Calculus & Linear Algebra' | 'Digital Logic';
  courseCode: string;
  latex: string;
  description: string;
  frequentlyTestedIn: string;
  variables: { sym: string; desc: string }[];
}
