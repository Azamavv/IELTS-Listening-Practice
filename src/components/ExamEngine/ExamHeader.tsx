import React from 'react';
import { 
  Clock, 
  Eye, 
  EyeOff, 
  Pause, 
  Play, 
  Type, 
  Palette, 
  Highlighter, 
  StickyNote, 
  LogOut,
  Volume2
} from 'lucide-react';
import { SkillType } from '../../types/ielts';

interface ExamHeaderProps {
  moduleTitle: string;
  skill: SkillType;
  remainingSeconds: number;
  isPaused: boolean;
  onTogglePause: () => void;
  fontSize: 'standard' | 'large' | 'extralarge';
  onChangeFontSize: (size: 'standard' | 'large' | 'extralarge') => void;
  contrastTheme: 'light' | 'dark' | 'yellow-black';
  onChangeContrastTheme: (theme: 'light' | 'dark' | 'yellow-black') => void;
  showTimer: boolean;
  onToggleTimer: () => void;
  isNotesOpen: boolean;
  onToggleNotes: () => void;
  onExitExam: () => void;
  activeHighlightColor: string | null;
  onSelectHighlightColor: (color: string | null) => void;
  completedQuestions?: number;
  totalQuestions?: number;
}

export const ExamHeader: React.FC<ExamHeaderProps> = ({
  moduleTitle,
  skill,
  remainingSeconds,
  isPaused,
  onTogglePause,
  fontSize,
  onChangeFontSize,
  contrastTheme,
  onChangeContrastTheme,
  showTimer,
  onToggleTimer,
  isNotesOpen,
  onToggleNotes,
  onExitExam,
  activeHighlightColor,
  onSelectHighlightColor,
  completedQuestions = 0,
  totalQuestions = 40,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = remainingSeconds <= 300 && remainingSeconds > 0;

  // Circular progress calculations
  const radius = 14;
  const circumference = 2 * Math.PI * radius; // ~87.96
  const validTotal = totalQuestions > 0 ? totalQuestions : 1;
  const validCompleted = Math.min(validTotal, Math.max(0, completedQuestions));
  const percentage = Math.round((validCompleted / validTotal) * 100);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <header className={`border-b select-none transition-colors duration-150 ${
      contrastTheme === 'dark'
        ? 'bg-slate-900 border-slate-800 text-slate-100'
        : contrastTheme === 'yellow-black'
        ? 'bg-black border-yellow-500 text-yellow-300'
        : 'bg-white border-slate-200 text-slate-900'
    }`}>
      {/* Top Bar with Candidate & Test Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Test Identification */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-red-700 text-white flex items-center justify-center font-bold text-xs tracking-wider shrink-0">
            IELTS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight">{moduleTitle}</span>
              <span className="text-xs px-1.5 py-0.2 bg-slate-200/60 dark:bg-slate-800 rounded text-slate-600 dark:text-slate-300 font-mono">
                GBR-048291
              </span>
            </div>
            <p className="text-xs opacity-70">
              Candidate: Free Test Taker · Computer-Delivered IELTS Simulation
            </p>
          </div>
        </div>

        {/* Center: Progress & Official Countdown Timer */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Circular Section Progress Indicator */}
          {totalQuestions > 0 && (
            <div
              className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg border transition-colors ${
                contrastTheme === 'yellow-black'
                  ? 'bg-black border-yellow-500 text-yellow-300'
                  : contrastTheme === 'dark'
                  ? 'bg-slate-800/80 border-slate-700 text-slate-100'
                  : 'bg-slate-100 border-slate-200 text-slate-900'
              }`}
              title={`Section Progress: ${validCompleted} of ${validTotal} ${
                skill === 'writing' ? 'tasks' : skill === 'speaking' ? 'parts' : 'questions'
              } completed (${percentage}%)`}
              role="progressbar"
              aria-valuenow={percentage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Current section progress: ${percentage}% completed`}
            >
              {/* Circular SVG Ring */}
              <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
                <svg className="w-8 h-8 -rotate-90 transform" viewBox="0 0 36 36">
                  {/* Background track circle */}
                  <circle
                    cx="18"
                    cy="18"
                    r={radius}
                    fill="none"
                    strokeWidth="3.2"
                    className={
                      contrastTheme === 'yellow-black'
                        ? 'stroke-yellow-950'
                        : contrastTheme === 'dark'
                        ? 'stroke-slate-700'
                        : 'stroke-slate-200'
                    }
                  />
                  {/* Dynamic Progress Arc */}
                  <circle
                    cx="18"
                    cy="18"
                    r={radius}
                    fill="none"
                    strokeWidth="3.2"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className={`transition-all duration-300 ease-out ${
                      contrastTheme === 'yellow-black'
                        ? 'stroke-yellow-400'
                        : percentage === 100
                        ? 'stroke-emerald-500'
                        : 'stroke-blue-600 dark:stroke-blue-400'
                    }`}
                  />
                </svg>

                {/* Percentage label in center */}
                <span
                  className={`absolute inset-0 flex items-center justify-center font-mono font-bold tabular-nums leading-none ${
                    percentage >= 100 ? 'text-[8.5px]' : 'text-[9.5px]'
                  } ${
                    contrastTheme === 'yellow-black'
                      ? 'text-yellow-300'
                      : percentage === 100
                      ? 'text-emerald-600 dark:text-emerald-400 font-extrabold'
                      : contrastTheme === 'dark'
                      ? 'text-slate-100'
                      : 'text-slate-800'
                  }`}
                >
                  {percentage}%
                </span>
              </div>

              {/* Text detail */}
              <div className="flex flex-col text-left leading-tight">
                <div className="flex items-center gap-1 text-xs font-semibold tabular-nums">
                  <span>
                    {validCompleted}/{validTotal}
                  </span>
                  <span className="text-[10px] font-normal opacity-70">
                    {skill === 'writing' ? 'tasks' : skill === 'speaking' ? 'parts' : 'done'}
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-wider opacity-60 font-medium">
                  Progress
                </span>
              </div>
            </div>
          )}

          {/* Official Countdown Timer */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <Clock className={`w-4 h-4 ${isLowTime ? 'text-red-500 animate-pulse' : 'text-slate-500'}`} />
            {showTimer ? (
              <span className={`font-mono text-base font-bold tabular-nums ${isLowTime ? 'text-red-600' : ''}`}>
                {formatTime(remainingSeconds)}
              </span>
            ) : (
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Timer Hidden</span>
            )}

            <button
              onClick={onToggleTimer}
              title={showTimer ? 'Hide timer' : 'Show timer'}
              className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors cursor-pointer text-slate-600 dark:text-slate-300"
            >
              {showTimer ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={onTogglePause}
              title={isPaused ? 'Resume exam' : 'Pause exam'}
              className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors cursor-pointer text-slate-600 dark:text-slate-300"
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-600" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Right: Accessibility Controls & Tools */}
        <div className="flex items-center gap-2">
          {/* Highlighter Tools */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
            <Highlighter className="w-3.5 h-3.5 text-slate-500 ml-1" />
            <button
              onClick={() => onSelectHighlightColor(activeHighlightColor === 'yellow' ? null : 'yellow')}
              className={`w-5 h-5 rounded-full bg-amber-300 transition-transform ${
                activeHighlightColor === 'yellow' ? 'ring-2 ring-blue-600 scale-110' : 'opacity-70 hover:opacity-100'
              }`}
              title="Highlight Yellow"
            />
            <button
              onClick={() => onSelectHighlightColor(activeHighlightColor === 'green' ? null : 'green')}
              className={`w-5 h-5 rounded-full bg-emerald-400 transition-transform ${
                activeHighlightColor === 'green' ? 'ring-2 ring-blue-600 scale-110' : 'opacity-70 hover:opacity-100'
              }`}
              title="Highlight Green"
            />
            <button
              onClick={() => onSelectHighlightColor(activeHighlightColor === 'cyan' ? null : 'cyan')}
              className={`w-5 h-5 rounded-full bg-cyan-300 transition-transform ${
                activeHighlightColor === 'cyan' ? 'ring-2 ring-blue-600 scale-110' : 'opacity-70 hover:opacity-100'
              }`}
              title="Highlight Cyan"
            />
          </div>

          {/* Digital Notepad */}
          <button
            onClick={onToggleNotes}
            className={`p-1.5 rounded-lg border text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer ${
              isNotesOpen
                ? 'bg-amber-100 border-amber-300 text-amber-900'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
            }`}
            title="Open scratchpad notes"
          >
            <StickyNote className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Notes</span>
          </button>

          {/* Font Size Selector */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700 text-xs font-semibold">
            <button
              onClick={() => onChangeFontSize('standard')}
              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                fontSize === 'standard' ? 'bg-white dark:bg-slate-700 shadow-xs font-bold' : 'opacity-60'
              }`}
              title="Standard font size"
            >
              A
            </button>
            <button
              onClick={() => onChangeFontSize('large')}
              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                fontSize === 'large' ? 'bg-white dark:bg-slate-700 shadow-xs font-bold' : 'opacity-60'
              }`}
              title="Large font size"
            >
              A+
            </button>
            <button
              onClick={() => onChangeFontSize('extralarge')}
              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                fontSize === 'extralarge' ? 'bg-white dark:bg-slate-700 shadow-xs font-bold' : 'opacity-60'
              }`}
              title="Extra large font size"
            >
              A++
            </button>
          </div>

          {/* Contrast Mode Selector */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700 text-xs font-semibold">
            <button
              onClick={() => onChangeContrastTheme('light')}
              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                contrastTheme === 'light' ? 'bg-white dark:bg-slate-700 shadow-xs' : 'opacity-60'
              }`}
              title="Standard black on white"
            >
              Light
            </button>
            <button
              onClick={() => onChangeContrastTheme('dark')}
              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                contrastTheme === 'dark' ? 'bg-white dark:bg-slate-700 shadow-xs' : 'opacity-60'
              }`}
              title="White on dark slate"
            >
              Dark
            </button>
            <button
              onClick={() => onChangeContrastTheme('yellow-black')}
              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                contrastTheme === 'yellow-black' ? 'bg-black text-yellow-300 border border-yellow-400' : 'opacity-60'
              }`}
              title="Yellow on black"
            >
              High
            </button>
          </div>

          {/* Exit Exam Button */}
          <button
            onClick={onExitExam}
            className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
            title="Exit Exam to Home"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
