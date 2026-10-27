import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  RefreshCw, 
  Award, 
  TrendingUp, 
  HelpCircle,
  Play,
  RotateCcw
} from 'lucide-react';
import { SpeakingPartItem, SpeakingEvaluation } from '../../types/ielts';

interface SpeakingTestProps {
  parts: SpeakingPartItem[];
  studentNotes: Record<number, string>;
  onChangeStudentNotes: (part: number, text: string) => void;
  evaluation?: SpeakingEvaluation;
  onSetEvaluation: (evalData: SpeakingEvaluation) => void;
  fontSize: 'standard' | 'large' | 'extralarge';
  contrastTheme: 'light' | 'dark' | 'yellow-black';
}

export const SpeakingTest: React.FC<SpeakingTestProps> = ({
  parts,
  studentNotes,
  onChangeStudentNotes,
  evaluation,
  onSetEvaluation,
  fontSize,
  contrastTheme,
}) => {
  const [activePartNum, setActivePartNum] = useState<1 | 2 | 3>(1);
  const [isRecording, setIsRecording] = useState(false);
  const [isExaminerSpeaking, setIsExaminerSpeaking] = useState(false);
  const [prepSecondsRemaining, setPrepSecondsRemaining] = useState<number | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalError, setEvalError] = useState<string | null>(null);

  const activePart = parts.find((p) => p.partNumber === activePartNum) || parts[0];
  const activeText = studentNotes[activePartNum] || '';

  const recognitionRef = useRef<any>(null);
  const prepTimerRef = useRef<any>(null);

  // Examiner text-to-speech
  const handleExaminerSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const ukVoice = voices.find((v) => v.lang.includes('en-GB')) || voices.find((v) => v.lang.startsWith('en'));
    if (ukVoice) utterance.voice = ukVoice;

    utterance.onstart = () => setIsExaminerSpeaking(true);
    utterance.onend = () => setIsExaminerSpeaking(false);
    utterance.onerror = () => setIsExaminerSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // 1-minute cue card prep timer
  const handleStartPrepTimer = () => {
    setPrepSecondsRemaining(60);
    if (prepTimerRef.current) clearInterval(prepTimerRef.current);

    prepTimerRef.current = setInterval(() => {
      setPrepSecondsRemaining((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(prepTimerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResetPrepTimer = () => {
    if (prepTimerRef.current) clearInterval(prepTimerRef.current);
    setPrepSecondsRemaining(null);
  };

  // Speech Recognition (Microphone recording & transcription)
  const handleToggleRecord = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
    } else {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        alert('Your browser does not support Web Speech Recognition. You can type your answers directly in the box below.');
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript) {
          onChangeStudentNotes(
            activePartNum,
            activeText ? `${activeText} ${transcript}` : transcript
          );
        }
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    }
  };

  // AI Speaking Evaluation caller
  const handleEvaluateSpeaking = async () => {
    if (activeText.trim().length < 20) {
      setEvalError('Please record or type a more substantial response (at least 20 words) for the examiner to evaluate.');
      return;
    }

    setIsEvaluating(true);
    setEvalError(null);

    try {
      const promptDescription =
        activePartNum === 2 && activePart.cueCard
          ? activePart.cueCard.topic
          : activePart.questions.join('; ');

      const res = await fetch('/api/evaluate-speaking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          part: activePartNum,
          questionPrompt: promptDescription,
          transcriptOrNotes: activeText,
        }),
      });

      if (!res.ok) {
        throw new Error('Speaking evaluation failed.');
      }

      const data = await res.json();
      onSetEvaluation(data);
    } catch (err: any) {
      console.error(err);
      setEvalError(err.message || 'Service temporarily unavailable. Please try again.');
    } finally {
      setIsEvaluating(false);
    }
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      if (recognitionRef.current) recognitionRef.current.stop();
      if (prepTimerRef.current) clearInterval(prepTimerRef.current);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 h-full min-h-[calc(100vh-140px)]">
      {/* Left Pane: Examiner Station */}
      <div className={`lg:col-span-5 border-r p-6 sm:p-8 overflow-y-auto space-y-6 ${
        contrastTheme === 'dark'
          ? 'border-slate-800 bg-slate-900/60'
          : contrastTheme === 'yellow-black'
          ? 'border-yellow-600 bg-black text-yellow-300'
          : 'border-slate-200 bg-slate-50/60'
      }`}>
        {/* Part Selector */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => {
                setActivePartNum(num as 1 | 2 | 3);
                handleResetPrepTimer();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activePartNum === num
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              Part {num}
            </button>
          ))}
        </div>

        {/* Examiner Profile Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-purple-600 shrink-0">
            <img
              src="/src/assets/images/ielts_speaking_examiner_1793112952558.jpg"
              alt="IELTS Speaking Examiner"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {isExaminerSpeaking && (
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                Senior IELTS Examiner
              </h3>
              <span className="text-[10px] px-1.5 py-0.5 bg-purple-50 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-semibold rounded">
                Live Simulation
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Official 1-on-1 interview format (11–14 minutes total)
            </p>
          </div>
        </div>

        {/* Part Prompt & Questions */}
        <div className="space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
              {activePart.title}
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              {activePart.instructions}
            </p>
          </div>

          {/* Cue Card Display (Part 2) */}
          {activePartNum === 2 && activePart.cueCard && (
            <div className="border border-purple-300 dark:border-purple-800 rounded-xl p-5 bg-purple-50/60 dark:bg-purple-950/30 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-900 dark:text-purple-300 uppercase">
                  Candidate Task Card
                </span>
                {/* 1-Minute Prep Countdown */}
                <div className="flex items-center gap-2">
                  {prepSecondsRemaining !== null ? (
                    <span className="font-mono text-sm font-bold text-purple-900 dark:text-purple-200">
                      Prep: {prepSecondsRemaining}s
                    </span>
                  ) : (
                    <button
                      onClick={handleStartPrepTimer}
                      className="px-2.5 py-1 bg-purple-700 hover:bg-purple-800 text-white rounded text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Clock className="w-3 h-3" />
                      <span>Start 1-Min Prep</span>
                    </button>
                  )}
                  {prepSecondsRemaining !== null && (
                    <button
                      onClick={handleResetPrepTimer}
                      className="text-xs text-purple-700 hover:text-purple-900"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {activePart.cueCard.topic}
              </div>

              <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <p className="font-medium text-slate-500">You should say:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {activePart.cueCard.bulletPoints.map((bp, bIdx) => (
                    <li key={bIdx}>{bp}</li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleExaminerSpeak(activePart.cueCard!.topic)}
                className="text-xs font-semibold text-purple-700 hover:text-purple-900 flex items-center gap-1.5 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Hear Examiner Read Prompt</span>
              </button>
            </div>
          )}

          {/* Part 1 & Part 3 Questions */}
          {(activePartNum === 1 || activePartNum === 3) && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Examiner Questions:
              </span>
              <div className="space-y-2">
                {activePart.questions.map((qText, qIdx) => (
                  <div
                    key={qIdx}
                    className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-3 text-xs"
                  >
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {qIdx + 1}. {qText}
                    </span>
                    <button
                      onClick={() => handleExaminerSpeak(qText)}
                      className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-purple-600 transition-colors cursor-pointer shrink-0"
                      title="Examiner asks this question aloud"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sample Band 8.5/9 Response Toggle */}
          {activePart.sampleResponse && (
            <div className="p-3.5 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                Band 8.5+ Model Demonstration Answer:
              </span>
              <p className="text-slate-600 dark:text-slate-400 italic leading-relaxed">
                "{activePart.sampleResponse}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right Pane: Speech Recording & Response Deck */}
      <div className="lg:col-span-7 p-6 sm:p-8 overflow-y-auto space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Candidate Response Station
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Speak with microphone or type your spoken response
              </h3>
            </div>

            {/* Audio Wave / Record Button */}
            <button
              onClick={handleToggleRecord}
              className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
                isRecording
                  ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
                  : 'bg-purple-700 hover:bg-purple-800 text-white'
              }`}
            >
              {isRecording ? (
                <>
                  <MicOff className="w-4 h-4" />
                  <span>Stop Recording</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" />
                  <span>Record Microphone</span>
                </>
              )}
            </button>
          </div>

          {/* Live Waveform Indicator when Recording */}
          {isRecording && (
            <div className="h-10 bg-red-950/80 rounded-lg p-2 flex items-center justify-center gap-1.5 border border-red-800">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping mr-2" />
              <span className="text-xs text-red-200 font-mono font-medium">Recording voice transcript...</span>
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-red-400 rounded-full animate-pulse"
                  style={{ height: `${Math.random() * 80 + 20}%` }}
                />
              ))}
            </div>
          )}

          {/* Response Textarea / Transcript */}
          <div className="space-y-1">
            <textarea
              value={activeText}
              onChange={(e) => onChangeStudentNotes(activePartNum, e.target.value)}
              placeholder="Your spoken transcript or notes appear here. You can also edit and polish your response before requesting evaluation..."
              className="w-full h-56 p-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none font-sans text-sm"
            />
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>{activeText.split(/\s+/).filter(Boolean).length} words</span>
              <span>Speak clearly for 1–2 minutes continuously.</span>
            </div>
          </div>

          {/* Evaluate Action */}
          <div className="flex justify-end pt-1">
            <button
              onClick={handleEvaluateSpeaking}
              disabled={isEvaluating}
              className="px-5 py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {isEvaluating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Examiner Scoring Speaking...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-purple-200" />
                  <span>Evaluate Speaking with AI Examiner</span>
                </>
              )}
            </button>
          </div>

          {evalError && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300">
              {evalError}
            </div>
          )}

          {/* AI Speaking Evaluation Card */}
          {evaluation && (
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-5 bg-white dark:bg-slate-800 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    Official Speaking Assessment Report
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Estimated Band:</span>
                  <span className="text-lg font-black font-mono text-purple-700 bg-purple-50 dark:bg-purple-950/50 px-2.5 py-0.5 rounded-lg border border-purple-300">
                    Band {evaluation.overallBand.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* 4 Criteria Scores */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] text-slate-500 uppercase">Fluency & Coherence</div>
                  <div className="text-base font-bold font-mono text-slate-900 dark:text-slate-100 mt-0.5">
                    {evaluation.scores.fluencyCoherence.toFixed(1)}
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
                <div className="p-2.5 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] text-slate-500 uppercase">Pronunciation</div>
                  <div className="text-base font-bold font-mono text-slate-900 dark:text-slate-100 mt-0.5">
                    {evaluation.scores.pronunciation.toFixed(1)}
                  </div>
                </div>
              </div>

              {/* Examiner Notes */}
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                <p className="font-semibold text-slate-800 dark:text-slate-200">Examiner Commentary:</p>
                <p>{evaluation.examinerNotes}</p>
              </div>

              {/* Native Idiomatic Upgrades */}
              {evaluation.idiomaticExpressions?.length > 0 && (
                <div className="space-y-2 text-xs">
                  <span className="font-bold text-purple-900 dark:text-purple-300">
                    Recommended High-Band Collocations:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {evaluation.idiomaticExpressions.map((item, idx) => (
                      <div key={idx} className="p-2 rounded bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-[11px]">
                        <span className="font-bold text-purple-700 dark:text-purple-300">"{item.phrase}"</span>
                        <p className="text-slate-600 dark:text-slate-400 mt-0.5">{item.meaning}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Polished Native Phrasing */}
              {evaluation.upgradedSample && (
                <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs space-y-1">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300">
                    Native Speaker Model Delivery:
                  </span>
                  <p className="text-emerald-900 dark:text-emerald-200 italic leading-relaxed">
                    "{evaluation.upgradedSample}"
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
