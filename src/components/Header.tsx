import React from 'react';
import { BookOpen, Moon, Sun, Sparkles, FileText, Bookmark, Calculator, Printer, PlusCircle } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  activeTab: 'archive' | 'formulas' | 'review' | 'bookmarks';
  setActiveTab: (tab: 'archive' | 'formulas' | 'review' | 'bookmarks') => void;
  bookmarkedCount: number;
  onOpenContribute: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  setDarkMode,
  activeTab,
  setActiveTab,
  bookmarkedCount,
  onOpenContribute
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Live Status */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">NoteVault</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300/40 dark:border-emerald-700/40">
                  <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  TIET Archive Active
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                TIET Patiala Verified PYQs & Peer Solutions
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center p-1 rounded-xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
            <button
              onClick={() => setActiveTab('archive')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'archive'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              PYQ Archive
            </button>
            <button
              onClick={() => setActiveTab('formulas')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'formulas'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              LaTeX Formula Hub
            </button>
            <button
              onClick={() => setActiveTab('review')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'review'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Printer className="w-3.5 h-3.5" />
              Exam Prep Sheet
            </button>
            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'bookmarks'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              Bookmarked ({bookmarkedCount})
            </button>
          </nav>

          {/* Action CTAs & Dark Mode */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenContribute}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-600/30 transition-all hover:scale-[1.02]"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Submit Solution</span>
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg border border-slate-200/80 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav tabs */}
      <div className="md:hidden flex overflow-x-auto border-t border-slate-200/60 dark:border-slate-800/60 px-4 py-2 gap-2 custom-scroll">
        <button
          onClick={() => setActiveTab('archive')}
          className={`flex-shrink-0 px-3 py-1 rounded-md text-xs font-medium ${
            activeTab === 'archive' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Archive
        </button>
        <button
          onClick={() => setActiveTab('formulas')}
          className={`flex-shrink-0 px-3 py-1 rounded-md text-xs font-medium ${
            activeTab === 'formulas' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Formulas
        </button>
        <button
          onClick={() => setActiveTab('review')}
          className={`flex-shrink-0 px-3 py-1 rounded-md text-xs font-medium ${
            activeTab === 'review' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Print Sheet
        </button>
        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`flex-shrink-0 px-3 py-1 rounded-md text-xs font-medium ${
            activeTab === 'bookmarks' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Saved ({bookmarkedCount})
        </button>
      </div>
    </header>
  );
};
