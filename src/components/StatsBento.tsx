import React from 'react';
import { FileCheck, ShieldCheck, Users, Trophy, Flame, Sparkles } from 'lucide-react';

interface StatsBentoProps {
  totalPapers: number;
  verifiedCount: number;
  totalViews: number;
}

export const StatsBento: React.FC<StatsBentoProps> = ({ totalPapers, verifiedCount, totalViews }) => {
  const verifiedPercentage = Math.round((verifiedCount / (totalPapers || 1)) * 100);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
      {/* Tile 1 */}
      <div className="relative overflow-hidden rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
          <span className="text-xs font-medium uppercase tracking-wider">Archived PYQs</span>
          <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <FileCheck className="w-4 h-4" />
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold tracking-tight font-mono text-slate-900 dark:text-white">
            1,482
          </span>
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center">
            +18 this week
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Covering MST-1, MST-2 & EST (2021-2024)
        </p>
      </div>

      {/* Tile 2 */}
      <div className="relative overflow-hidden rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
          <span className="text-xs font-medium uppercase tracking-wider">Verified Solutions</span>
          <span className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold tracking-tight font-mono text-slate-900 dark:text-white">
            94.2%
          </span>
          <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-mono text-[11px]">
            Faculty + TA
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Crowd-validated with peer marking schemes
        </p>
      </div>

      {/* Tile 3 */}
      <div className="relative overflow-hidden rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
          <span className="text-xs font-medium uppercase tracking-wider">Study Sessions</span>
          <span className="p-1.5 rounded-lg bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400">
            <Users className="w-4 h-4" />
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold tracking-tight font-mono text-slate-900 dark:text-white">
            {(totalViews / 1000).toFixed(1)}k
          </span>
          <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
            <Flame className="w-3 h-3" /> 3.2k Active
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          CSE, ECE, MECH & COE active peers
        </p>
      </div>

      {/* Tile 4 */}
      <div className="relative overflow-hidden rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
          <span className="text-xs font-medium uppercase tracking-wider">Top Contributor Rank</span>
          <span className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
            <Trophy className="w-4 h-4" />
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white truncate">
            CSED Honor Roll
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>48 peer-approved writeups this term</span>
        </p>
      </div>
    </div>
  );
};
