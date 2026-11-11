import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { StatsBento } from './components/StatsBento';
import { PaperList } from './components/PaperList';
import { FormulaCheatSheet } from './components/FormulaCheatSheet';
import { PrintExamReview } from './components/PrintExamReview';
import { PaperDetailModal } from './components/PaperDetailModal';
import { ContributeModal } from './components/ContributeModal';
import { INITIAL_PAPERS, FORMULA_CHEATSHEET } from './data/mockData';
import { PYQPaper, FormulaSnippet } from './types';
import { Sparkles, Bookmark, BookOpen, Layers } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'archive' | 'formulas' | 'review' | 'bookmarks'>('archive');
  const [papers, setPapers] = useState<PYQPaper[]>(INITIAL_PAPERS);
  const [formulas, setFormulas] = useState<FormulaSnippet[]>(FORMULA_CHEATSHEET);
  const [selectedPaper, setSelectedPaper] = useState<PYQPaper | null>(null);
  const [showContributeModal, setShowContributeModal] = useState(false);

  // Sync dark mode class on root HTML element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle bookmarking
  const handleBookmark = (paperId: string) => {
    setPapers((prev) =>
      prev.map((p) => (p.id === paperId ? { ...p, bookmarked: !p.bookmarked } : p))
    );
    if (selectedPaper && selectedPaper.id === paperId) {
      setSelectedPaper((prev) => (prev ? { ...prev, bookmarked: !prev.bookmarked } : null));
    }
  };

  // Handle solution voting
  const handleVoteSolution = (
    paperId: string,
    qIdx: number,
    solId: string,
    voteType: 'up' | 'down'
  ) => {
    setPapers((prev) =>
      prev.map((p) => {
        if (p.id !== paperId) return p;
        const updatedQuestions = [...p.questions];
        const targetQ = updatedQuestions[qIdx];
        if (!targetQ) return p;

        targetQ.solutions = targetQ.solutions.map((sol) => {
          if (sol.id !== solId) return sol;
          if (sol.userVote === voteType) {
            // Undo vote
            return {
              ...sol,
              userVote: undefined,
              upvotes: voteType === 'up' ? sol.upvotes - 1 : sol.upvotes,
              downvotes: voteType === 'down' ? sol.downvotes - 1 : sol.downvotes
            };
          }

          const upOffset = voteType === 'up' ? 1 : sol.userVote === 'up' ? -1 : 0;
          const downOffset = voteType === 'down' ? 1 : sol.userVote === 'down' ? -1 : 0;

          return {
            ...sol,
            userVote: voteType,
            upvotes: sol.upvotes + upOffset,
            downvotes: sol.downvotes + downOffset
          };
        });

        return { ...p, questions: updatedQuestions };
      })
    );

    // Keep selected modal synchronized
    setSelectedPaper((prev) => {
      if (!prev || prev.id !== paperId) return prev;
      const updatedQuestions = [...prev.questions];
      const targetQ = updatedQuestions[qIdx];
      if (!targetQ) return prev;

      targetQ.solutions = targetQ.solutions.map((sol) => {
        if (sol.id !== solId) return sol;
        const upOffset = voteType === 'up' ? (sol.userVote === 'up' ? -1 : 1) : sol.userVote === 'up' ? -1 : 0;
        const downOffset = voteType === 'down' ? (sol.userVote === 'down' ? -1 : 1) : sol.userVote === 'down' ? -1 : 0;
        const newVote = sol.userVote === voteType ? undefined : voteType;

        return {
          ...sol,
          userVote: newVote,
          upvotes: sol.upvotes + upOffset,
          downvotes: sol.downvotes + downOffset
        };
      });

      return { ...prev, questions: updatedQuestions };
    });
  };

  // Add a peer solution to a question
  const handleAddSolution = (paperId: string, qIdx: number, stepText: string, finalAns: string) => {
    const newSolution = {
      id: `sol-${Date.now()}`,
      authorName: 'Peer Contributor (You)',
      authorRoll: '102303045',
      authorBadge: 'Student Contributor' as const,
      verified: false,
      upvotes: 1,
      downvotes: 0,
      userVote: 'up' as const,
      postedDate: 'Just now',
      stepByStep: stepText.split('\n').filter((s) => s.trim().length > 0),
      finalAnswer: finalAns,
      keyFormulas: [],
      tips: 'Recently submitted peer working. Pending vote consensus.'
    };

    setPapers((prev) =>
      prev.map((p) => {
        if (p.id !== paperId) return p;
        const updatedQuestions = [...p.questions];
        if (updatedQuestions[qIdx]) {
          updatedQuestions[qIdx].solutions.push(newSolution);
        }
        return { ...p, questions: updatedQuestions, hasVerifiedSolution: true };
      })
    );

    setSelectedPaper((prev) => {
      if (!prev || prev.id !== paperId) return prev;
      const updatedQuestions = [...prev.questions];
      if (updatedQuestions[qIdx]) {
        updatedQuestions[qIdx].solutions.push(newSolution);
      }
      return { ...prev, questions: updatedQuestions, hasVerifiedSolution: true };
    });
  };

  // Add formula to cheat-sheet
  const handleAddFormula = (newFormula: FormulaSnippet) => {
    setFormulas((prev) => [newFormula, ...prev]);
  };

  // Add whole new paper
  const handleAddPaper = (newPaper: PYQPaper) => {
    setPapers((prev) => [newPaper, ...prev]);
  };

  const bookmarkedPapers = useMemo(() => papers.filter((p) => p.bookmarked), [papers]);
  const verifiedCount = useMemo(() => papers.filter((p) => p.hasVerifiedSolution).length, [papers]);
  const totalViews = useMemo(() => papers.reduce((sum, p) => sum + p.views, 0), [papers]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookmarkedCount={bookmarkedPapers.length}
        onOpenContribute={() => setShowContributeModal(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Bento Stats Grid */}
        <StatsBento
          totalPapers={papers.length}
          verifiedCount={verifiedCount}
          totalViews={totalViews}
        />

        {/* Tab Content */}
        {activeTab === 'archive' && (
          <PaperList
            papers={papers}
            onSelectPaper={(paper) => setSelectedPaper(paper)}
            onBookmark={handleBookmark}
          />
        )}

        {activeTab === 'formulas' && (
          <FormulaCheatSheet
            formulas={formulas}
            onAddFormula={handleAddFormula}
          />
        )}

        {activeTab === 'review' && (
          <PrintExamReview papers={papers} />
        )}

        {activeTab === 'bookmarks' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80">
              <Bookmark className="w-5 h-5 text-amber-500" />
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Bookmarked Exam Papers ({bookmarkedPapers.length})
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Quick access to question papers saved for revision before MSTs and EST.
                </p>
              </div>
            </div>

            {bookmarkedPapers.length === 0 ? (
              <div className="text-center py-16 rounded-2xl bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 p-8">
                <Bookmark className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-50" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  No bookmarked papers yet
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                  Click the bookmark icon on any paper card in the PYQ Archive to save it for quick review.
                </p>
              </div>
            ) : (
              <PaperList
                papers={bookmarkedPapers}
                onSelectPaper={(paper) => setSelectedPaper(paper)}
                onBookmark={handleBookmark}
              />
            )}
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {selectedPaper && (
        <PaperDetailModal
          paper={selectedPaper}
          onClose={() => setSelectedPaper(null)}
          onVoteSolution={handleVoteSolution}
          onBookmark={handleBookmark}
          onAddSolution={handleAddSolution}
        />
      )}

      {/* Contribute Modal */}
      {showContributeModal && (
        <ContributeModal
          onClose={() => setShowContributeModal(false)}
          onAddPaper={handleAddPaper}
        />
      )}
    </div>
  );
}
