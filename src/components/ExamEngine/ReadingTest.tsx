import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  Highlighter, 
  Eraser, 
  CheckCircle2, 
  Info,
  Maximize2
} from 'lucide-react';
import { ReadingPassage, BaseQuestion } from '../../types/ielts';

interface ReadingTestProps {
  passages: ReadingPassage[];
  activeQuestionId: number;
  onSelectQuestion: (id: number) => void;
  userAnswers: Record<number, string>;
  onAnswerQuestion: (id: number, answer: string) => void;
  fontSize: 'standard' | 'large' | 'extralarge';
  contrastTheme: 'light' | 'dark' | 'yellow-black';
  activeHighlightColor: string | null;
}

export const ReadingTest: React.FC<ReadingTestProps> = ({
  passages,
  activeQuestionId,
  onSelectQuestion,
  userAnswers,
  onAnswerQuestion,
  fontSize,
  contrastTheme,
  activeHighlightColor,
}) => {
  // Find which passage contains the activeQuestionId
  const currentPassageIndex = Math.max(
    0,
    passages.findIndex((p) => p.questions.some((q) => q.id === activeQuestionId))
  );

  const [activePassageIdx, setActivePassageIdx] = useState(currentPassageIndex);
  const [highlights, setHighlights] = useState<Array<{ text: string; color: string }>>([]);

  // Sync active passage when question selected from footer
  useEffect(() => {
    const foundIdx = passages.findIndex((p) =>
      p.questions.some((q) => q.id === activeQuestionId)
    );
    if (foundIdx !== -1 && foundIdx !== activePassageIdx) {
      setActivePassageIdx(foundIdx);
    }
  }, [activeQuestionId, passages]);

  const activePassage = passages[activePassageIdx] || passages[0];

  // Text selection highlight handler
  const handleMouseUpText = () => {
    if (!activeHighlightColor) return;
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const selectedText = selection.toString().trim();
    if (selectedText.length > 2) {
      setHighlights((prev) => [
        ...prev.filter((h) => h.text !== selectedText),
        { text: selectedText, color: activeHighlightColor },
      ]);
      selection.removeAllRanges();
    }
  };

  const handleClearHighlights = () => {
    setHighlights([]);
  };

  // Font sizing styles
  const fontClass =
    fontSize === 'large'
      ? 'text-lg leading-relaxed'
      : fontSize === 'extralarge'
      ? 'text-xl leading-loose'
      : 'text-base leading-normal';

  const headingFontClass =
    fontSize === 'large'
      ? 'text-2xl'
      : fontSize === 'extralarge'
      ? 'text-3xl'
      : 'text-xl';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 h-full min-h-[calc(100vh-140px)]">
      {/* Left Pane: Reading Passage */}
      <div 
        onMouseUp={handleMouseUpText}
        className={`lg:col-span-6 border-r p-6 sm:p-8 overflow-y-auto space-y-6 ${
          contrastTheme === 'dark'
            ? 'border-slate-800 bg-slate-900/60'
            : contrastTheme === 'yellow-black'
            ? 'border-yellow-600 bg-black text-yellow-300'
            : 'border-slate-200 bg-white'
        }`}
      >
        {/* Passage Switcher Tabs */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            {passages.map((p, idx) => {
              const isSelected = activePassageIdx === idx;
              const answeredInPassage = p.questions.filter((q) => userAnswers[q.id]).length;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setActivePassageIdx(idx);
                    onSelectQuestion(p.questions[0].id);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  Passage {p.id} ({p.questions[0].id}–{p.questions[p.questions.length - 1].id})
                </button>
              );
            })}
          </div>

          {highlights.length > 0 && (
            <button
              onClick={handleClearHighlights}
              className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1 transition-colors cursor-pointer"
              title="Clear all text highlights"
            >
              <Eraser className="w-3.5 h-3.5" />
              <span>Clear Highlights</span>
            </button>
          )}
        </div>

        {/* Passage Header */}
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Reading Passage {activePassage.id}
          </div>
          <h1 className={`${headingFontClass} font-extrabold text-slate-900 dark:text-slate-100 tracking-tight text-balance`}>
            {activePassage.title}
          </h1>
          {activePassage.subtitle && (
            <p className="text-xs text-slate-500 italic">
              {activePassage.subtitle}
            </p>
          )}
        </div>

        {/* Accompanying image for Passage 1 */}
        {activePassage.id === 1 && (
          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xs max-w-lg mx-auto">
            <img
              src="/src/assets/images/ielts_reading_botany_1793112952425.jpg"
              alt="Botany study of mangrove root systems"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover max-h-64"
            />
            <div className="bg-slate-50 dark:bg-slate-800/90 px-3 py-1.5 text-[11px] text-slate-500 text-center italic">
              Figure 1.1: Anatomical adaptations of mangrove stilt root and pneumatophore architectures.
            </div>
          </div>
        )}

        {/* Paragraphs with labels (A, B, C...) */}
        <div className="space-y-5 text-slate-800 dark:text-slate-200">
          {activePassage.paragraphs.map((para, pIdx) => {
            return (
              <div key={pIdx} className="flex gap-4 items-start">
                {para.label && (
                  <span className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold text-xs flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0 select-none">
                    {para.label}
                  </span>
                )}
                <p className={`${fontClass} font-normal text-justify flex-1 leading-relaxed`}>
                  {para.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Pane: Question Deck */}
      <div className={`lg:col-span-6 p-6 sm:p-8 overflow-y-auto space-y-6 ${
        contrastTheme === 'dark'
          ? 'bg-slate-900/30'
          : contrastTheme === 'yellow-black'
          ? 'bg-black text-yellow-300'
          : 'bg-slate-50/50'
      }`}>
        <div className="border-b border-slate-200 dark:border-slate-700 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Questions {activePassage.questions[0].id}–{activePassage.questions[activePassage.questions.length - 1].id}
            </h2>
            <p className="text-xs text-slate-500">
              Select or type the correct answer according to the passage.
            </p>
          </div>
          <span className="text-xs font-semibold px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-700 dark:text-slate-300">
            {activePassage.questions.filter((q) => userAnswers[q.id]).length} / {activePassage.questions.length} Answered
          </span>
        </div>

        {/* Questions list */}
        <div className="space-y-6">
          {activePassage.questions.map((q) => {
            const isActive = q.id === activeQuestionId;
            const currentAnswer = userAnswers[q.id] || '';

            return (
              <div
                key={q.id}
                id={`q-${q.id}`}
                onClick={() => onSelectQuestion(q.id)}
                className={`p-5 rounded-xl border transition-all ${
                  isActive
                    ? 'border-emerald-600 bg-emerald-50/20 dark:bg-emerald-950/20 ring-1 ring-emerald-600 shadow-xs'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded text-xs font-bold flex items-center justify-center shrink-0 ${
                    isActive
                      ? 'bg-emerald-700 text-white'
                      : currentAnswer
                      ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}>
                    {q.id}
                  </div>

                  <div className="flex-1 space-y-3">
                    <p className={`font-semibold ${fontClass} text-slate-900 dark:text-slate-100`}>
                      {q.prompt}
                    </p>

                    {/* True / False / Not Given options */}
                    {q.type === 'true_false_not_given' && (
                      <div className="grid grid-cols-3 gap-2 pt-1">
                        {['True', 'False', 'Not Given'].map((val) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => onAnswerQuestion(q.id, val)}
                            className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all cursor-pointer text-center ${
                              currentAnswer === val
                                ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                                : 'bg-slate-50 dark:bg-slate-700/60 border-slate-200 dark:border-slate-600 hover:bg-slate-100 text-slate-700 dark:text-slate-200'
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Yes / No / Not Given options */}
                    {q.type === 'yes_no_not_given' && (
                      <div className="grid grid-cols-3 gap-2 pt-1">
                        {['Yes', 'No', 'Not Given'].map((val) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => onAnswerQuestion(q.id, val)}
                            className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all cursor-pointer text-center ${
                              currentAnswer === val
                                ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                                : 'bg-slate-50 dark:bg-slate-700/60 border-slate-200 dark:border-slate-600 hover:bg-slate-100 text-slate-700 dark:text-slate-200'
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Matching headings / Information options */}
                    {q.type === 'matching_headings' && q.options && (
                      <div className="space-y-1.5 pt-1">
                        {q.options.map((opt, optIdx) => (
                          <label
                            key={optIdx}
                            className={`flex items-center gap-3 p-2.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                              currentAnswer === opt
                                ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold'
                                : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`reading-q-${q.id}`}
                              value={opt}
                              checked={currentAnswer === opt}
                              onChange={() => onAnswerQuestion(q.id, opt)}
                              className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {/* Multiple Choice */}
                    {q.type === 'multiple_choice' && q.options && (
                      <div className="space-y-1.5 pt-1">
                        {q.options.map((opt, optIdx) => (
                          <label
                            key={optIdx}
                            className={`flex items-center gap-3 p-2.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                              currentAnswer === opt
                                ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold'
                                : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`reading-q-${q.id}`}
                              value={opt}
                              checked={currentAnswer === opt}
                              onChange={() => onAnswerQuestion(q.id, opt)}
                              className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {/* Fill blank / Sentence completion */}
                    {(q.type === 'fill_blank' || q.type === 'short_answer') && (
                      <div className="pt-1 flex items-center gap-2 max-w-md">
                        <input
                          type="text"
                          value={currentAnswer}
                          onChange={(e) => onAnswerQuestion(q.id, e.target.value)}
                          placeholder="Write words from the passage..."
                          className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium"
                        />
                        {currentAnswer && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
