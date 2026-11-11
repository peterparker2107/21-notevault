import React, { useState } from 'react';
import { PYQPaper } from '../types';
import {
  X,
  CheckCircle2,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Award,
  BookOpen,
  Share2,
  Bookmark,
  Send,
  Sparkles,
  Lightbulb
} from 'lucide-react';

interface PaperDetailModalProps {
  paper: PYQPaper;
  onClose: () => void;
  onVoteSolution: (paperId: string, qIdx: number, solId: string, voteType: 'up' | 'down') => void;
  onBookmark: (paperId: string) => void;
  onAddSolution: (paperId: string, qIdx: number, stepText: string, finalAns: string) => void;
}

export const PaperDetailModal: React.FC<PaperDetailModalProps> = ({
  paper,
  onClose,
  onVoteSolution,
  onBookmark,
  onAddSolution
}) => {
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [showSubmitBox, setShowSubmitBox] = useState(false);
  const [newSteps, setNewSteps] = useState('');
  const [newFinal, setNewFinal] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const activeQuestion = paper.questions[activeQuestionIdx] || paper.questions[0];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePostSolution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSteps.trim() || !newFinal.trim()) return;
    onAddSolution(paper.id, activeQuestionIdx, newSteps, newFinal);
    setNewSteps('');
    setNewFinal('');
    setShowSubmitBox(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                {paper.courseCode}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {paper.examType} ({paper.year})
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-medium">
                {paper.department} • Semester {paper.semester}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {paper.courseTitle}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Module: {paper.syllabusModule} • Max Marks: {paper.totalMarks} • Time: {paper.timeLimitMins} mins
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onBookmark(paper.id)}
              className={`p-2 rounded-xl border transition-colors ${
                paper.bookmarked
                  ? 'bg-amber-500 text-white border-amber-600'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Bookmark paper"
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Share paper link"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 custom-scroll">
          {/* Question Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {paper.questions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveQuestionIdx(idx);
                  setShowSubmitBox(false);
                }}
                className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeQuestionIdx === idx
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {q.qNum} ({q.marks}M)
              </button>
            ))}
          </div>

          {/* Active Question Prompt */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-indigo-600 dark:text-indigo-400">
                Question {activeQuestion.qNum}
              </span>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                {activeQuestion.marks} Marks
              </span>
            </div>
            <p className="text-sm text-slate-900 dark:text-slate-100 font-medium leading-relaxed">
              {activeQuestion.prompt}
            </p>

            {activeQuestion.latexFormula && (
              <div className="p-3 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-800">
                <code>{activeQuestion.latexFormula}</code>
              </div>
            )}
          </div>

          {/* Solutions Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Crowd-Voted Solutions ({activeQuestion.solutions.length})
              </h3>

              <button
                onClick={() => setShowSubmitBox(!showSubmitBox)}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {showSubmitBox ? 'Cancel submission' : 'Submit your solution'}
              </button>
            </div>

            {/* Inline Solution Submission */}
            {showSubmitBox && (
              <form
                onSubmit={handlePostSolution}
                className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-3"
              >
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-300">
                  Submit Peer Solution for {activeQuestion.qNum}
                </h4>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Step-by-Step Derivation / Logic
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Step 1: Write down the base equations...&#10;Step 2: Differentiate with respect to t...&#10;Step 3: Evaluate at boundary conditions..."
                    value={newSteps}
                    onChange={(e) => setNewSteps(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Final Result / Boxed Answer
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. h <= 1.44 log2(N)"
                    value={newFinal}
                    onChange={(e) => setNewFinal(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowSubmitBox(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Publish Solution
                  </button>
                </div>
              </form>
            )}

            {/* List of existing solutions */}
            {activeQuestion.solutions.length === 0 ? (
              <div className="text-center py-8 p-4 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-500 text-xs">
                No solutions submitted yet for this question. Be the first TIET student to submit one!
              </div>
            ) : (
              <div className="space-y-4">
                {activeQuestion.solutions.map((sol) => (
                  <div
                    key={sol.id}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs text-indigo-600 dark:text-indigo-400">
                          {sol.authorName.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-slate-900 dark:text-white">
                              {sol.authorName}
                            </span>
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                sol.authorBadge === 'Professor Verified'
                                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                  : sol.authorBadge === 'Top 1% Senior TA'
                                  ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                              }`}
                            >
                              {sol.authorBadge}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400">
                            Roll: {sol.authorRoll} • {sol.postedDate}
                          </span>
                        </div>
                      </div>

                      {/* Vote Buttons */}
                      <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/70 p-1 rounded-xl">
                        <button
                          onClick={() => onVoteSolution(paper.id, activeQuestionIdx, sol.id, 'up')}
                          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold transition-all ${
                            sol.userVote === 'up'
                              ? 'bg-emerald-600 text-white'
                              : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600'
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span className="font-mono">{sol.upvotes}</span>
                        </button>
                        <button
                          onClick={() => onVoteSolution(paper.id, activeQuestionIdx, sol.id, 'down')}
                          className={`p-1 rounded-lg text-xs transition-all ${
                            sol.userVote === 'down'
                              ? 'bg-rose-600 text-white'
                              : 'text-slate-400 hover:text-rose-600'
                          }`}
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Step-by-step content */}
                    <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed border-l-2 border-indigo-500/40 pl-3">
                      {sol.stepByStep.map((step, sIdx) => (
                        <p key={sIdx}>{step}</p>
                      ))}
                    </div>

                    {/* Final Answer */}
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block">
                        Final Answer:
                      </span>
                      <p className="font-mono text-xs font-semibold text-slate-900 dark:text-emerald-400 mt-0.5">
                        {sol.finalAnswer}
                      </p>
                    </div>

                    {/* Tips & Formula Callouts */}
                    {sol.tips && (
                      <div className="flex items-start gap-2 text-xs text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-xl border border-amber-200 dark:border-amber-900/60">
                        <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>
                          <strong>Marking Tip:</strong> {sol.tips}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
