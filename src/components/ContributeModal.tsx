import React, { useState } from 'react';
import { PYQPaper, Department, ExamType, AcademicYear } from '../types';
import { X, Upload, Plus, FileText, CheckCircle2, FileUp, Loader2, Sparkles } from 'lucide-react';

interface ContributeModalProps {
  onClose: () => void;
  onAddPaper: (paper: PYQPaper) => void;
}

export const ContributeModal: React.FC<ContributeModalProps> = ({ onClose, onAddPaper }) => {
  const [courseCode, setCourseCode] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [department, setDepartment] = useState<Department>('CSE');
  const [examType, setExamType] = useState<ExamType>('MST-1');
  const [year, setYear] = useState<AcademicYear>('2024');
  const [semester, setSemester] = useState(4);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Moderate' | 'Challenging' | 'Hardcore'>('Moderate');
  const [questionPrompt, setQuestionPrompt] = useState('');
  const [solutionSteps, setSolutionSteps] = useState('');
  const [finalAns, setFinalAns] = useState('');
  const [formula, setFormula] = useState('');

  // Note Upload Simulation State
  const [isSimulatingUpload, setIsSimulatingUpload] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStage, setUploadStage] = useState('');
  const [uploadedDocName, setUploadedDocName] = useState<string | null>(null);

  const simulateNoteUpload = (sampleDoc: 'algo' | 'signals') => {
    setIsSimulatingUpload(true);
    setUploadProgress(15);
    setUploadStage('Reading PDF / Handwritten notes buffer...');
    setUploadedDocName(sampleDoc === 'algo' ? 'MST1_UCS406_AVL_Rotations_Notes.pdf' : 'EST_UEC404_Nyquist_Sampling_Sheet.pdf');

    setTimeout(() => {
      setUploadProgress(55);
      setUploadStage('Running OCR & LaTeX equation parser...');
    }, 350);

    setTimeout(() => {
      setUploadProgress(100);
      setUploadStage('Auto-fill complete!');

      if (sampleDoc === 'algo') {
        setCourseCode('UCS406');
        setCourseTitle('Data Structures & Algorithms');
        setDepartment('CSE');
        setExamType('MST-1');
        setYear('2024');
        setSemester(4);
        setDifficulty('Challenging');
        setQuestionPrompt('Explain why AVL tree rotations guarantee O(log N) worst-case insertion time. Show the left-right double rotation with heights.');
        setFormula('h \\le 1.44 \\log_2(N + 2) - 0.328');
        setSolutionSteps('1. The height of an AVL tree with N nodes satisfies N(h) = N(h-1) + N(h-2) + 1.\n2. By Fibonacci recurrence lower bound, h <= 1.44 log2(N+2).\n3. Any single or double rotation restores height balance factor in O(1) pointer updates.\n4. Therefore, total search + rotation time is strictly O(log N).');
        setFinalAns('Worst-case AVL height bounded at 1.44 log2(N), insertion O(log N).');
      } else {
        setCourseCode('UEC404');
        setCourseTitle('Signals & Systems');
        setDepartment('ECE');
        setExamType('EST');
        setYear('2024');
        setSemester(4);
        setDifficulty('Moderate');
        setQuestionPrompt('State the Nyquist-Shannon sampling theorem for a strictly band-limited continuous-time signal. Derive the minimum sampling frequency.');
        setFormula('f_s \\ge 2 f_{\\max}');
        setSolutionSteps('1. Let x(t) be band-limited to frequency f_max, meaning X(f) = 0 for |f| > f_max.\n2. Ideal impulse train sampling creates spectral replicas at intervals of f_s.\n3. Replicas do not overlap (no aliasing) iff f_s - f_max >= f_max, giving f_s >= 2 f_max.\n4. Perfect reconstruction is achieved via an ideal brickwall low-pass sinc filter.');
        setFinalAns('f_s >= 2 f_max (Nyquist rate) with sinc interpolation.');
      }

      setIsSimulatingUpload(false);
    }, 750);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseCode.trim() || !courseTitle.trim() || !questionPrompt.trim()) return;

    const newPaper: PYQPaper = {
      id: `pyq-${courseCode.toLowerCase()}-${examType.toLowerCase()}-${year}`,
      courseCode: courseCode.toUpperCase().trim(),
      courseTitle: courseTitle.trim(),
      department,
      semester,
      examType,
      year,
      credits: 4,
      totalMarks: examType === 'EST' ? 50 : 25,
      timeLimitMins: examType === 'EST' ? 180 : 90,
      difficulty,
      questionsCount: 1,
      hasVerifiedSolution: !!solutionSteps.trim(),
      views: 12,
      downloads: 4,
      syllabusModule: 'Mid-term core syllabus',
      questions: [
        {
          qNum: 'Q1',
          marks: examType === 'EST' ? 10 : 7,
          prompt: questionPrompt.trim(),
          latexFormula: formula.trim() || undefined,
          solutions: solutionSteps.trim()
            ? [
                {
                  id: `sol-${Date.now()}`,
                  authorName: 'Peer Contributor (You)',
                  authorRoll: '102303001',
                  authorBadge: 'Student Contributor',
                  verified: false,
                  upvotes: 1,
                  downvotes: 0,
                  postedDate: 'Just now',
                  stepByStep: solutionSteps
                    .split('\n')
                    .map((s) => s.trim())
                    .filter(Boolean),
                  finalAnswer: finalAns.trim() || 'Verified step solution',
                  keyFormulas: formula.trim() ? [formula.trim()] : [],
                  tips: 'Initial student submission pending faculty verification.'
                }
              ]
            : []
        }
      ]
    };

    onAddPaper(newPaper);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        <div className="p-5 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Contribute PYQ & Solution
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Support your TIET peers with verified exam solutions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 custom-scroll">
          {/* Note Upload Simulation Area */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-dashed border-indigo-200 dark:border-indigo-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Note Upload Simulation & OCR Extraction
                </span>
              </div>
              {uploadedDocName && (
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {uploadedDocName}
                </span>
              )}
            </div>

            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              Simulate uploading a scanned TIET exam paper or handwritten peer notes to auto-detect course, question, and LaTeX formula.
            </p>

            {isSimulatingUpload ? (
              <div className="space-y-2 py-2">
                <div className="flex items-center justify-between text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    {uploadStage}
                  </span>
                  <span className="font-mono">{uploadProgress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900 overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[10px] font-semibold uppercase text-slate-400">Simulate Scan:</span>
                <button
                  type="button"
                  onClick={() => simulateNoteUpload('algo')}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-slate-700 shadow-sm transition-all"
                >
                  ⚡ UCS406 DSA Note PDF
                </button>
                <button
                  type="button"
                  onClick={() => simulateNoteUpload('signals')}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-300 border border-violet-200 dark:border-violet-700 hover:bg-violet-50 dark:hover:bg-slate-700 shadow-sm transition-all"
                >
                  ⚡ UEC404 Signals Note PDF
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Course Code
              </label>
              <input
                type="text"
                required
                placeholder="e.g. UCS406"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs uppercase bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Course Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Data Structures & Algorithms"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value as Department)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="MECH">MECH</option>
                <option value="COE">COE</option>
                <option value="EE">EE</option>
                <option value="CIVIL">CIVIL</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Exam Type
              </label>
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value as ExamType)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="MST-1">MST-1</option>
                <option value="MST-2">MST-2</option>
                <option value="EST">EST</option>
                <option value="QUIZ">QUIZ</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Year
              </label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value as AcademicYear)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Question Prompt
            </label>
            <textarea
              required
              rows={3}
              placeholder="Type the full exam question here..."
              value={questionPrompt}
              onChange={(e) => setQuestionPrompt(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Governing LaTeX Formula (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. T(n) = 2T(n/2) + O(n)"
              value={formula}
              onChange={(e) => setFormula(e.target.value)}
              className="w-full px-3 py-2 font-mono text-xs rounded-xl bg-slate-950 text-emerald-400 border border-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Step-by-Step Verified Solution (Optional)
            </label>
            <textarea
              rows={4}
              placeholder="Step 1: ...&#10;Step 2: ..."
              value={solutionSteps}
              onChange={(e) => setSolutionSteps(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Final Answer
            </label>
            <input
              type="text"
              placeholder="e.g. Total complexity is O(N log N)"
              value={finalAns}
              onChange={(e) => setFinalAns(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-600/30"
            >
              Publish to Archive
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
