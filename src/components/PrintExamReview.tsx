import React, { useState } from 'react';
import { PYQPaper } from '../types';
import { Printer, CheckCircle2, BookOpen, AlertCircle } from 'lucide-react';

interface PrintExamReviewProps {
  papers: PYQPaper[];
}

export const PrintExamReview: React.FC<PrintExamReviewProps> = ({ papers }) => {
  const [selectedPaperId, setSelectedPaperId] = useState<string>(papers[0]?.id || '');
  const [includeSolutions, setIncludeSolutions] = useState(true);
  const [includeFormulas, setIncludeFormulas] = useState(true);
  const [includeMarkingScheme, setIncludeMarkingScheme] = useState(true);

  const currentPaper = papers.find(p => p.id === selectedPaperId) || papers[0];

  const handlePrint = () => {
    window.print();
  };

  if (!currentPaper) {
    return (
      <div className="p-8 text-center text-slate-500">
        No question papers available for print review.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Control Banner (hidden during print) */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm print:hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Printer className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Printable Exam Prep Review Mode
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Generate clean, high-contrast, double-sided revision sheets formatted for offline study.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedPaperId}
              onChange={(e) => setSelectedPaperId(e.target.value)}
              className="px-3 py-2 rounded-xl text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            >
              {papers.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.courseCode} — {p.examType} ({p.year})
                </option>
              ))}
            </select>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all"
            >
              <Printer className="w-4 h-4" />
              Print / Save PDF
            </button>
          </div>
        </div>

        {/* Print Configuration Toggles */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-4 text-xs">
          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={includeSolutions}
              onChange={(e) => setIncludeSolutions(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            Include Verified Solutions
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={includeFormulas}
              onChange={(e) => setIncludeFormulas(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            Include LaTeX Formula Callouts
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={includeMarkingScheme}
              onChange={(e) => setIncludeMarkingScheme(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            Include TA Exam Tips & Marking Warnings
          </label>
        </div>
      </div>

      {/* The Printable Document Paper Canvas */}
      <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-2xl border border-slate-200/90 shadow-lg max-w-4xl mx-auto font-sans print:border-none print:shadow-none print:p-0 print:max-w-none">
        {/* University Exam Header */}
        <div className="border-b-2 border-slate-900 pb-4 mb-6 text-center">
          <p className="text-xs tracking-widest uppercase font-semibold text-slate-600">
            Thapar Institute of Engineering & Technology, Patiala
          </p>
          <p className="text-xs text-slate-500">
            (Deemed to be University under Section 3 of the UGC Act, 1956)
          </p>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 mt-2 uppercase">
            {currentPaper.examType === 'EST'
              ? 'End Semester Examination'
              : `Mid Semester Test (${currentPaper.examType})`} — {currentPaper.year}
          </h1>
          <div className="mt-3 flex flex-wrap items-center justify-between text-xs font-mono font-medium border-t border-slate-300 pt-2 px-2">
            <span>Course: <strong>{currentPaper.courseCode}</strong> ({currentPaper.courseTitle})</span>
            <span>Dept: {currentPaper.department} | Sem: {currentPaper.semester}</span>
            <span>Max Marks: {currentPaper.totalMarks}</span>
            <span>Time: {currentPaper.timeLimitMins} mins</span>
          </div>
        </div>

        {/* NoteVault Verified Stamp */}
        <div className="mb-6 p-2.5 rounded-lg border border-slate-300 bg-slate-50 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-slate-800">
              NoteVault Peer-Verified Master Key
            </span>
            <span className="text-slate-500">
              Module: {currentPaper.syllabusModule}
            </span>
          </div>
          <span className="font-mono text-[11px] text-slate-500">
            Archive Ref: {currentPaper.id}
          </span>
        </div>

        {/* Question & Solution Blocks */}
        <div className="space-y-8">
          {currentPaper.questions.map((q, idx) => (
            <div key={idx} className="break-inside-avoid border-b border-slate-200 pb-6">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-bold text-sm text-slate-900">
                  {q.qNum}. {q.prompt}
                </h3>
                <span className="font-mono font-bold text-xs bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
                  [{q.marks} Marks]
                </span>
              </div>

              {includeFormulas && q.latexFormula && (
                <div className="my-2.5 p-2 bg-slate-100 border-l-2 border-indigo-600 rounded-r text-xs font-mono text-slate-800">
                  <span className="font-semibold text-indigo-700 block text-[10px] uppercase">
                    Governing Equation / Recurrence:
                  </span>
                  {q.latexFormula}
                </div>
              )}

              {/* Verified Solution Section */}
              {includeSolutions && q.solutions.length > 0 && (
                <div className="mt-3 bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2 text-xs">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                    <span className="font-semibold text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Solution by {q.solutions[0].authorName} ({q.solutions[0].authorBadge})
                    </span>
                    <span className="font-mono text-[10px] text-slate-500">
                      {q.solutions[0].upvotes} Peer Upvotes
                    </span>
                  </div>

                  <div className="space-y-1.5 text-slate-800">
                    {q.solutions[0].stepByStep.map((step, sIdx) => (
                      <p key={sIdx} className="leading-relaxed">
                        • {step}
                      </p>
                    ))}
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-200 font-medium text-slate-900">
                    <strong>Final Answer:</strong> {q.solutions[0].finalAnswer}
                  </div>

                  {includeMarkingScheme && q.solutions[0].tips && (
                    <div className="mt-1 flex items-start gap-1.5 text-[11px] text-amber-800 bg-amber-50 p-2 rounded border border-amber-200">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Marking Scheme Tip:</strong> {q.solutions[0].tips}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-8 pt-4 border-t border-slate-300 text-center text-[10px] text-slate-500 flex justify-between items-center">
          <span>NoteVault TIET Smart Campus Exam Archive</span>
          <span>Generated for Study & Peer Review</span>
          <span>Page 1 of 1</span>
        </div>
      </div>
    </div>
  );
};
