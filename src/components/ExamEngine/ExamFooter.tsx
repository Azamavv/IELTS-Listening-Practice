import React from 'react';
import { ChevronLeft, ChevronRight, Flag, Check } from 'lucide-react';

interface ExamFooterProps {
  totalQuestions: number;
  currentQuestionId: number;
  onSelectQuestion: (id: number) => void;
  answeredQuestions: Record<number, any>;
  flaggedQuestions: Set<number>;
  onToggleFlag: (id: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
  contrastTheme?: 'light' | 'dark' | 'yellow-black';
  sectionName?: string;
}

export const ExamFooter: React.FC<ExamFooterProps> = ({
  totalQuestions,
  currentQuestionId,
  onSelectQuestion,
  answeredQuestions,
  flaggedQuestions,
  onToggleFlag,
  onNext,
  onPrevious,
  onSubmit,
  contrastTheme = 'light',
  sectionName = 'Module',
}) => {
  const answeredCount = Object.keys(answeredQuestions).filter(
    (key) => answeredQuestions[Number(key)] !== undefined && answeredQuestions[Number(key)] !== ''
  ).length;

  const isCurrentFlagged = flaggedQuestions.has(currentQuestionId);

  return (
    <footer className={`border-t select-none transition-colors duration-150 py-2.5 px-4 sm:px-6 shadow-sm ${
      contrastTheme === 'dark'
        ? 'bg-slate-900 border-slate-800 text-slate-100'
        : contrastTheme === 'yellow-black'
        ? 'bg-black border-yellow-500 text-yellow-300'
        : 'bg-white border-slate-200 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Review toggle & progress counter */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <button
            onClick={() => onToggleFlag(currentQuestionId)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
              isCurrentFlagged
                ? 'bg-amber-100 border-amber-400 text-amber-900'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
            }`}
          >
            <Flag className={`w-3.5 h-3.5 ${isCurrentFlagged ? 'fill-amber-600 text-amber-600' : 'text-slate-500'}`} />
            <span>Review Question {currentQuestionId}</span>
          </button>

          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            <span>Answered: </span>
            <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">
              {answeredCount}
            </span>
            <span> / {totalQuestions}</span>
          </div>
        </div>

        {/* Center: Question Navigation 1-40 Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-full py-1 scrollbar-none">
          {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((num) => {
            const isAnswered = answeredQuestions[num] !== undefined && answeredQuestions[num] !== '';
            const isFlagged = flaggedQuestions.has(num);
            const isCurrent = num === currentQuestionId;

            let btnClass = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';

            if (isCurrent) {
              btnClass = 'bg-blue-700 text-white border-blue-700 font-bold ring-2 ring-blue-400';
            } else if (isFlagged) {
              btnClass = 'bg-amber-100 border-amber-400 text-amber-900 font-semibold';
            } else if (isAnswered) {
              btnClass = 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 border-slate-800 font-medium';
            }

            return (
              <button
                key={num}
                onClick={() => onSelectQuestion(num)}
                className={`relative w-8 h-8 rounded shrink-0 border text-xs flex items-center justify-center transition-all cursor-pointer ${btnClass}`}
                title={`Question ${num}${isFlagged ? ' (Review)' : ''}${isAnswered ? ' (Answered)' : ''}`}
              >
                <span>{num}</span>
                {isFlagged && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 ring-1 ring-white" />
                )}
                {isAnswered && !isCurrent && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-emerald-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Prev, Next & Submit */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={onPrevious}
            disabled={currentQuestionId <= 1}
            className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <button
            onClick={onNext}
            disabled={currentQuestionId >= totalQuestions}
            className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={onSubmit}
            className="ml-2 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer whitespace-nowrap"
          >
            Submit {sectionName}
          </button>
        </div>
      </div>
    </footer>
  );
};
