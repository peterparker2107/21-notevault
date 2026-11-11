import React, { useState } from 'react';
import { PYQPaper, Department, ExamType, AcademicYear } from '../types';
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Eye,
  Download,
  Bookmark,
  ChevronRight,
  BookOpen,
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface PaperListProps {
  papers: PYQPaper[];
  onSelectPaper: (paper: PYQPaper) => void;
  onBookmark: (paperId: string) => void;
}

export const PaperList: React.FC<PaperListProps> = ({ papers, onSelectPaper, onBookmark }) => {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState<string>('All');
  const [semesterFilter, setSemesterFilter] = useState<string>('All');
  const [courseFilter, setCourseFilter] = useState<string>('All');
  const [examFilter, setExamFilter] = useState<string>('All');
  const [yearFilter, setYearFilter] = useState<string>('All');
  const [onlyVerified, setOnlyVerified] = useState(false);

  // Extract unique course codes
  const uniqueCourses = Array.from(new Set(papers.map((p) => p.courseCode))).sort();

  const filteredPapers = papers.filter((paper) => {
    const matchesSearch =
      paper.courseCode.toLowerCase().includes(search.toLowerCase()) ||
      paper.courseTitle.toLowerCase().includes(search.toLowerCase()) ||
      paper.syllabusModule.toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === 'All' || paper.department === deptFilter;
    const matchesSemester = semesterFilter === 'All' || paper.semester.toString() === semesterFilter;
    const matchesCourse = courseFilter === 'All' || paper.courseCode === courseFilter;
    const matchesExam = examFilter === 'All' || paper.examType === examFilter;
    const matchesYear = yearFilter === 'All' || paper.year === yearFilter;
    const matchesVerified = !onlyVerified || paper.hasVerifiedSolution;

    return matchesSearch && matchesDept && matchesSemester && matchesCourse && matchesExam && matchesYear && matchesVerified;
  });

  const getDifficultyColor = (diff: PYQPaper['difficulty']) => {
    switch (diff) {
      case 'Easy':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'Moderate':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'Challenging':
        return 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800';
      case 'Hardcore':
        return 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filtering & Search Toolbar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-3.5">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="flex-1 w-full relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by course code, title, module (e.g. UCS406, AVL tree)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyVerified}
                onChange={(e) => setOnlyVerified(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>Verified Only</span>
            </label>
          </div>
        </div>

        {/* Filter select rows */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-1 border-t border-slate-100 dark:border-slate-800/80">
          <div>
            <span className="text-[10px] font-semibold uppercase text-slate-400 block mb-1">
              Department
            </span>
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            >
              <option value="All">All Branches</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="MECH">MECH</option>
              <option value="COE">COE</option>
              <option value="EE">EE</option>
            </select>
          </div>

          <div>
            <span className="text-[10px] font-semibold uppercase text-slate-400 block mb-1">
              Semester
            </span>
            <select
              value={semesterFilter}
              onChange={(e) => setSemesterFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
            >
              <option value="All">All Semesters</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
              <option value="5">Semester 5</option>
              <option value="6">Semester 6</option>
              <option value="7">Semester 7</option>
              <option value="8">Semester 8</option>
            </select>
          </div>

          <div>
            <span className="text-[10px] font-semibold uppercase text-slate-400 block mb-1">
              Course Code
            </span>
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
            >
              <option value="All">All Courses</option>
              {uniqueCourses.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <span className="text-[10px] font-semibold uppercase text-slate-400 block mb-1">
              Exam Type
            </span>
            <select
              value={examFilter}
              onChange={(e) => setExamFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            >
              <option value="All">All Exams</option>
              <option value="MST-1">MST-1 (Mid Sem 1)</option>
              <option value="MST-2">MST-2 (Mid Sem 2)</option>
              <option value="EST">EST (End Sem)</option>
            </select>
          </div>

          <div>
            <span className="text-[10px] font-semibold uppercase text-slate-400 block mb-1">
              Academic Year
            </span>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            >
              <option value="All">All Years</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>
        </div>
      </div>

      {/* Question Papers Cards */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
          <span>Showing {filteredPapers.length} question paper archives</span>
          <span>Semester-wise TIET archive curriculum</span>
        </div>

        {filteredPapers.length === 0 ? (
          <div className="text-center py-12 rounded-2xl bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 p-8">
            <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              No papers found matching filters
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Try adjusting your department or exam type filter, or contribute this paper!
            </p>
          </div>
        ) : (
          filteredPapers.map((paper) => (
            <div
              key={paper.id}
              className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700/60 transition-all hover:shadow-md"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                      {paper.courseCode}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                      {paper.examType} ({paper.year})
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {paper.department} • Sem {paper.semester}
                    </span>
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${getDifficultyColor(paper.difficulty)}`}>
                      {paper.difficulty}
                    </span>
                  </div>

                  <div>
                    <h3
                      onClick={() => onSelectPaper(paper)}
                      className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors cursor-pointer"
                    >
                      {paper.courseTitle}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Module: <span className="text-slate-700 dark:text-slate-300 font-medium">{paper.syllabusModule}</span> • {paper.questionsCount} Primary Questions • {paper.timeLimitMins} mins limit
                    </p>
                  </div>

                  {/* Status badges */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                    {paper.hasVerifiedSolution ? (
                      <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-4 h-4" />
                        Verified Solution Available
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-medium">
                        <HelpCircle className="w-4 h-4" />
                        Solution Under Peer Review
                      </span>
                    )}

                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <Eye className="w-3.5 h-3.5" />
                      {paper.views}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <Download className="w-3.5 h-3.5" />
                      {paper.downloads}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end md:self-center">
                  <button
                    onClick={() => onBookmark(paper.id)}
                    className={`p-2.5 rounded-xl border transition-colors ${
                      paper.bookmarked
                        ? 'bg-amber-500 text-white border-amber-600'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                    title={paper.bookmarked ? 'Bookmarked' : 'Bookmark for revision'}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onSelectPaper(paper)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-600/20 transition-all hover:scale-[1.02]"
                  >
                    <span>View Solutions</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
