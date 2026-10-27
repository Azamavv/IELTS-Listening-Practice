import React, { useState } from 'react';
import { 
  PenTool, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Award, 
  BookOpen, 
  HelpCircle, 
  RefreshCw,
  TrendingUp,
  FileText
} from 'lucide-react';
import { WritingTaskItem, WritingEvaluation } from '../../types/ielts';

interface WritingTestProps {
  tasks: WritingTaskItem[];
  task1Text: string;
  task2Text: string;
  onChangeTask1: (text: string) => void;
  onChangeTask2: (text: string) => void;
  evaluation?: WritingEvaluation;
  onSetEvaluation: (evalData: WritingEvaluation) => void;
  fontSize: 'standard' | 'large' | 'extralarge';
  contrastTheme: 'light' | 'dark' | 'yellow-black';
}

export const WritingTest: React.FC<WritingTestProps> = ({
  tasks,
  task1Text,
  task2Text,
  onChangeTask1,
  onChangeTask2,
  evaluation,
  onSetEvaluation,
  fontSize,
  contrastTheme,
}) => {
  const [activeTaskNum, setActiveTaskNum] = useState<1 | 2>(1);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalError, setEvalError] = useState<string | null>(null);

  const activeTask = tasks.find((t) => t.taskNumber === activeTaskNum) || tasks[0];
  const activeText = activeTaskNum === 1 ? task1Text : task2Text;
  const onChangeActiveText = activeTaskNum === 1 ? onChangeTask1 : onChangeTask2;

  // Word count calculator
  const countWords = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  };

  const wordCount = countWords(activeText);
  const isWordCountMet = wordCount >= activeTask.minWords;

  // AI Evaluation caller
  const handleEvaluateWithAI = async () => {
    if (wordCount < 40) {
      setEvalError(`Please write at least 40 words before requesting AI examination (Minimum required: ${activeTask.minWords} words).`);
      return;
    }

    setIsEvaluating(true);
    setEvalError(null);

    try {
      const res = await fetch('/api/evaluate-writing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskType: activeTaskNum === 1 ? 'task1' : 'task2',
          prompt: activeTask.prompt,
          studentResponse: activeText,
          chartContext: activeTask.chartDescription,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to evaluate essay.');
      }

      const data = await res.json();
      onSetEvaluation(data);
    } catch (err: any) {
      console.error('AI evaluation failed:', err);
      setEvalError(err.message || 'Service temporarily unavailable. Please try again.');
    } finally {
      setIsEvaluating(false);
    }
  };

  const fontClass =
    fontSize === 'large'
      ? 'text-lg leading-relaxed'
      : fontSize === 'extralarge'
      ? 'text-xl leading-loose'
      : 'text-base leading-normal';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 h-full min-h-[calc(100vh-140px)]">
      {/* Left Pane: Task Prompt & Chart Details */}
      <div className={`lg:col-span-5 border-r p-6 sm:p-8 overflow-y-auto space-y-6 ${
        contrastTheme === 'dark'
          ? 'border-slate-800 bg-slate-900/60'
          : contrastTheme === 'yellow-black'
          ? 'border-yellow-600 bg-black text-yellow-300'
          : 'border-slate-200 bg-slate-50/60'
      }`}>
        {/* Task Selector */}
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-700 pb-3">
          <button
            onClick={() => setActiveTaskNum(1)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTaskNum === 1
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            Task 1 (Report · 150w)
          </button>
          <button
            onClick={() => setActiveTaskNum(2)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTaskNum === 2
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            Task 2 (Essay · 250w)
          </button>
        </div>

        {/* Task Header & Guidance */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Writing Task {activeTaskNum}
            </span>
            <span>Recommended time: {activeTask.timeRecommendedMinutes} minutes</span>
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            {activeTask.title}
          </h2>

          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/60 dark:bg-amber-950/20 text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
            {activeTask.prompt}
          </div>
        </div>

        {/* Task 1 Graphic Illustration */}
        {activeTaskNum === 1 && activeTask.imageUrl && (
          <div className="space-y-2">
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xs bg-white">
              <img
                src={activeTask.imageUrl}
                alt="Renewable energy trends chart"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="text-[11px] text-slate-500 italic">
              Data note: Proportions represent % of total regional energy generation.
            </p>
          </div>
        )}

        {/* Writing Tips & Official Criteria Reminder */}
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-white dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-2">
          <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>Official IELTS Assessment Criteria (25% each):</span>
          </div>
          <ul className="list-disc pl-4 space-y-1 text-slate-500 dark:text-slate-400">
            <li><strong>Task Achievement / Response:</strong> Fully addressing all parts of prompt with clear position.</li>
            <li><strong>Coherence & Cohesion:</strong> Logical organization, clear progression, cohesive linking devices.</li>
            <li><strong>Lexical Resource:</strong> Wide range of vocabulary, precise collocation, natural idioms.</li>
            <li><strong>Grammatical Range & Accuracy:</strong> Varied complex sentence structures with high accuracy.</li>
          </ul>
        </div>
      </div>

      {/* Right Pane: Student Essay Editor & Live AI Evaluation */}
      <div className="lg:col-span-7 p-6 sm:p-8 overflow-y-auto space-y-6 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Header & Word Count Bar */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Candidate Response Area
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Type your Task {activeTaskNum} answer below
              </h3>
            </div>

            {/* Live Word Count Indicator */}
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold flex items-center gap-1.5 ${
                isWordCountMet
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                  : 'bg-amber-50 border-amber-300 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
              }`}>
                {isWordCountMet ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                )}
                <span>
                  {wordCount} / {activeTask.minWords} words
                </span>
              </div>
            </div>
          </div>

          {/* Response Textarea */}
          <div className="relative">
            <textarea
              value={activeText}
              onChange={(e) => onChangeActiveText(e.target.value)}
              placeholder={`Write your response here... Remember to write at least ${activeTask.minWords} words.`}
              className={`w-full h-80 sm:h-96 p-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-600 resize-none font-sans ${fontClass}`}
            />
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="text-xs text-slate-500">
              {!isWordCountMet ? (
                <span className="text-amber-600">
                  ⚠️ Need {activeTask.minWords - wordCount} more words to reach the minimum requirement.
                </span>
              ) : (
                <span className="text-emerald-600">
                  ✓ Minimum length requirement satisfied.
                </span>
              )}
            </div>

            <button
              onClick={handleEvaluateWithAI}
              disabled={isEvaluating}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isEvaluating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Examiner Analyzing Essay...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>Get Instant AI Band Score & Feedback</span>
                </>
              )}
            </button>
          </div>

          {evalError && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300">
              {evalError}
            </div>
          )}

          {/* AI Diagnostic Score Report Card */}
          {evaluation && (
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-5 bg-white dark:bg-slate-800 space-y-4 shadow-sm mt-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-600" />
                  <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    Official IELTS Diagnostic Score Card
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Estimated Band:</span>
                  <span className="text-lg font-black font-mono text-amber-600 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-0.5 rounded-lg border border-amber-300">
                    Band {evaluation.overallBand.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* 4 Criteria Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] text-slate-500 uppercase">Task Response</div>
                  <div className="text-base font-bold font-mono text-slate-900 dark:text-slate-100 mt-0.5">
                    {evaluation.scores.taskAchievement.toFixed(1)}
                  </div>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] text-slate-500 uppercase">Coherence</div>
                  <div className="text-base font-bold font-mono text-slate-900 dark:text-slate-100 mt-0.5">
                    {evaluation.scores.coherenceCohesion.toFixed(1)}
                  </div>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] text-slate-500 uppercase">Lexical Resource</div>
                  <div className="text-base font-bold font-mono text-slate-900 dark:text-slate-100 mt-0.5">
                    {evaluation.scores.lexicalResource.toFixed(1)}
                  </div>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] text-slate-500 uppercase">Grammar Range</div>
                  <div className="text-base font-bold font-mono text-slate-900 dark:text-slate-100 mt-0.5">
                    {evaluation.scores.grammaticalRange.toFixed(1)}
                  </div>
                </div>
              </div>

              {/* Examiner Commentary */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                  Examiner Feedback
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  {evaluation.examinerFeedback}
                </p>
              </div>

              {/* Strengths & Improvements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-lg space-y-1">
                  <div className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Observed Strengths</span>
                  </div>
                  <ul className="list-disc pl-4 text-emerald-900 dark:text-emerald-200 space-y-0.5">
                    {evaluation.strengths.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg space-y-1">
                  <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Areas to Reach Next Band</span>
                  </div>
                  <ul className="list-disc pl-4 text-amber-900 dark:text-amber-200 space-y-0.5">
                    {evaluation.improvements.map((imp, idx) => (
                      <li key={idx}>{imp}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Vocabulary Upgrades */}
              {evaluation.vocabularySuggestions?.length > 0 && (
                <div className="space-y-1.5 text-xs">
                  <div className="font-bold text-slate-800 dark:text-slate-200">
                    High-Band Vocabulary Upgrades:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {evaluation.vocabularySuggestions.map((vocab, vIdx) => (
                      <div key={vIdx} className="p-2 rounded bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-700 text-[11px]">
                        <span className="line-through text-slate-400">{vocab.original}</span>
                        <span className="mx-1 text-slate-400">→</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">{vocab.suggestion}</span>
                        <p className="text-[10px] text-slate-500 mt-0.5 italic">{vocab.context}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Band 9 Model Excerpt */}
              {evaluation.modelExcerpt && (
                <div className="p-3 bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg text-xs space-y-1">
                  <span className="font-bold text-blue-900 dark:text-blue-300">
                    Band 8.5–9.0 Model Excerpt:
                  </span>
                  <p className="italic text-slate-700 dark:text-slate-300 leading-relaxed">
                    "{evaluation.modelExcerpt}"
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
