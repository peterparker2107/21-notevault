import React, { useState } from 'react';
import { FormulaSnippet } from '../types';
import { Search, Copy, Check, Plus, Sparkles, Filter, BookOpen, Code, Eye } from 'lucide-react';

interface FormulaCheatSheetProps {
  formulas: FormulaSnippet[];
  onAddFormula: (formula: FormulaSnippet) => void;
}

export const FormulaCheatSheet: React.FC<FormulaCheatSheetProps> = ({ formulas, onAddFormula }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // LaTeX Live Equation Previewer Sandbox State
  const [sandboxLatex, setSandboxLatex] = useState('\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}');
  const [sandboxCopied, setSandboxCopied] = useState(false);

  // New formula form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<FormulaSnippet['category']>('Algorithms & DS');
  const [newCourse, setNewCourse] = useState('UCS406');
  const [newLatex, setNewLatex] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newExam, setNewExam] = useState('EST 2024');

  const categories = ['All', 'Algorithms & DS', 'Signal Processing', 'Thermodynamics', 'Calculus & Linear Algebra', 'Digital Logic'];

  const filteredFormulas = formulas.filter(f => {
    const matchesCategory = selectedCategory === 'All' || f.category === selectedCategory;
    const matchesSearch =
      f.title.toLowerCase().includes(search.toLowerCase()) ||
      f.latex.toLowerCase().includes(search.toLowerCase()) ||
      f.courseCode.toLowerCase().includes(search.toLowerCase()) ||
      f.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (latex: string, id: string) => {
    navigator.clipboard.writeText(latex);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveFormula = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newLatex.trim()) return;

    const created: FormulaSnippet = {
      id: `f-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      courseCode: newCourse.toUpperCase().trim(),
      latex: newLatex.trim(),
      description: newDesc.trim() || 'Key examination formula for derivation reference.',
      frequentlyTestedIn: newExam.trim() || 'Mid Semester Test & EST',
      variables: [
        { sym: 'x', desc: 'Primary independent variable' },
        { sym: 'C', desc: 'Constant of integration / system scale' }
      ]
    };

    onAddFormula(created);
    setShowAddModal(false);
    setNewTitle('');
    setNewLatex('');
    setNewDesc('');
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search LaTeX formulas, course codes (e.g., UEC404, Master Theorem)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-white placeholder-slate-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Formula
          </button>
        </div>
      </div>

      {/* Interactive LaTeX Equation Previewer & Sandbox */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900/90 dark:to-indigo-950/20 border border-indigo-200/60 dark:border-indigo-900/40 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-600 text-white shadow-sm">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                LaTeX Equation Live Previewer & Sandbox
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold font-mono">
                  Interactive
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Type or paste math syntax to preview formulas and copy ready-to-use LaTeX markup
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(sandboxLatex);
                setSandboxCopied(true);
                setTimeout(() => setSandboxCopied(false), 2000);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm transition-all"
            >
              {sandboxCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copied LaTeX</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy LaTeX</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Input & Quick Symbols */}
        <div className="space-y-2">
          <div className="relative">
            <input
              type="text"
              value={sandboxLatex}
              onChange={(e) => setSandboxLatex(e.target.value)}
              placeholder="e.g. T(n) = 2T(n/2) + \Theta(n)"
              className="w-full px-3.5 py-2.5 font-mono text-xs rounded-xl bg-slate-950 text-emerald-400 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>

          {/* Quick Symbol Insert Palette */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-[10px] font-semibold uppercase text-slate-400 shrink-0 mr-1">
              Quick Insert:
            </span>
            {[
              { label: 'frac', insert: '\\frac{a}{b}' },
              { label: 'sqrt', insert: '\\sqrt{x}' },
              { label: 'sum', insert: '\\sum_{i=1}^{n}' },
              { label: 'int', insert: '\\int_{a}^{b}' },
              { label: 'infty', insert: '\\infty' },
              { label: 'partial', insert: '\\partial' },
              { label: 'alpha', insert: '\\alpha' },
              { label: 'beta', insert: '\\beta' },
              { label: 'theta', insert: '\\theta' },
              { label: 'Delta', insert: '\\Delta' },
              { label: 'omega', insert: '\\omega' },
              { label: 'approx', insert: '\\approx' }
            ].map((sym) => (
              <button
                key={sym.label}
                type="button"
                onClick={() => setSandboxLatex((prev) => `${prev} ${sym.insert}`)}
                className="px-2 py-0.5 rounded-md font-mono text-[11px] bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors shrink-0"
              >
                {sym.insert}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Preview Box */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-950/70 border border-slate-200/90 dark:border-slate-800 shadow-inner flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 select-none">
              Live Preview:
            </span>
            <div className="font-serif italic text-base sm:text-lg text-slate-900 dark:text-slate-100 px-3 py-1 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200/60 dark:border-slate-800">
              {sandboxLatex || <span className="text-slate-400 font-sans not-italic text-xs">Type a formula above...</span>}
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
            <Code className="w-3.5 h-3.5 text-indigo-500" />
            <span>{sandboxLatex.length} characters</span>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scroll">
        <Filter className="w-4 h-4 text-slate-400 flex-shrink-0 mr-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Formula Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFormulas.map((formula) => (
          <div
            key={formula.id}
            className="flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700/60 transition-all group"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50">
                      {formula.courseCode}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {formula.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {formula.title}
                  </h3>
                </div>
                <button
                  onClick={() => handleCopy(formula.latex, formula.id)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  title="Copy LaTeX formula to clipboard"
                >
                  {copiedId === formula.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400 text-[11px]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Copy LaTeX</span>
                    </>
                  )}
                </button>
              </div>

              {/* LaTeX Code Box */}
              <div className="my-3 p-3.5 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs leading-relaxed overflow-x-auto border border-slate-800 shadow-inner">
                <code>{formula.latex}</code>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-3">
                {formula.description}
              </p>

              {/* Variables breakdown */}
              {formula.variables && formula.variables.length > 0 && (
                <div className="bg-slate-50 dark:bg-slate-800/40 rounded-lg p-2.5 border border-slate-200/60 dark:border-slate-800/60 space-y-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Notation Key:
                  </span>
                  {formula.variables.map((v, idx) => (
                    <div key={idx} className="flex items-center text-[11px] text-slate-600 dark:text-slate-300">
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 mr-2 min-w-8">
                        {v.sym}
                      </span>
                      <span>— {v.desc}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                <Sparkles className="w-3 h-3" />
                {formula.frequentlyTestedIn}
              </span>
              <span className="font-mono text-slate-400">ID: {formula.id}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Custom Formula Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Add Formula to Cheat-Sheet
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveFormula} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Formula Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Nyquist-Shannon Sampling Theorem"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Course Code
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. UEC404"
                    value={newCourse}
                    onChange={(e) => setNewCourse(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Domain / Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="Algorithms & DS">Algorithms & DS</option>
                    <option value="Signal Processing">Signal Processing</option>
                    <option value="Thermodynamics">Thermodynamics</option>
                    <option value="Calculus & Linear Algebra">Calculus & Linear Algebra</option>
                    <option value="Digital Logic">Digital Logic</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  LaTeX Code
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="f_s \ge 2 f_{\max}"
                  value={newLatex}
                  onChange={(e) => setNewLatex(e.target.value)}
                  className="w-full px-3 py-2 font-mono text-xs rounded-lg bg-slate-950 text-emerald-400 border border-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Description / Application
                </label>
                <input
                  type="text"
                  placeholder="Minimum sampling rate to reconstruct continuous band-limited signal"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Frequently Tested In
                </label>
                <input
                  type="text"
                  placeholder="MST-2 & EST Q1"
                  value={newExam}
                  onChange={(e) => setNewExam(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                >
                  Save to Cheat-Sheet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
