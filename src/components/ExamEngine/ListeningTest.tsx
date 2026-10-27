import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  FileText, 
  Info, 
  CheckCircle2, 
  HelpCircle 
} from 'lucide-react';
import { ListeningSection, BaseQuestion } from '../../types/ielts';

interface ListeningTestProps {
  sections: ListeningSection[];
  activeQuestionId: number;
  onSelectQuestion: (id: number) => void;
  userAnswers: Record<number, string>;
  onAnswerQuestion: (id: number, answer: string) => void;
  fontSize: 'standard' | 'large' | 'extralarge';
  contrastTheme: 'light' | 'dark' | 'yellow-black';
}

export const ListeningTest: React.FC<ListeningTestProps> = ({
  sections,
  activeQuestionId,
  onSelectQuestion,
  userAnswers,
  onAnswerQuestion,
  fontSize,
  contrastTheme,
}) => {
  // Determine which section contains the activeQuestionId
  const currentSectionIndex = Math.max(
    0,
    sections.findIndex((sec) =>
      sec.questions.some((q) => q.id === activeQuestionId)
    )
  );

  const [activeSectionIdx, setActiveSectionIdx] = useState(currentSectionIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0); // 0 to 100

  const activeSection = sections[activeSectionIdx] || sections[0];
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<any>(null);

  // Sync active section when question changes externally from footer
  useEffect(() => {
    const foundIdx = sections.findIndex((sec) =>
      sec.questions.some((q) => q.id === activeQuestionId)
    );
    if (foundIdx !== -1 && foundIdx !== activeSectionIdx) {
      setActiveSectionIdx(foundIdx);
    }
  }, [activeQuestionId, sections]);

  // Handle SpeechSynthesis audio playback for authentic IELTS audio narration
  const handleTogglePlay = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported by your browser.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      window.speechSynthesis.cancel();

      // Clean transcript text for speech narration
      const speechText = `${activeSection.title}. ${activeSection.scenario}. Now listen carefully and answer questions ${activeSection.questions[0].id} to ${activeSection.questions[activeSection.questions.length - 1].id}. \n\n ${activeSection.transcript.replace(/\[.*?\]:/g, '')}`;

      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.rate = playbackSpeed;
      utterance.pitch = 1.0;

      // Select natural English voice if available
      const voices = window.speechSynthesis.getVoices();
      const britishOrEnglishVoice = voices.find(
        (v) => (v.lang.includes('en-GB') || v.lang.includes('en-US')) && !v.name.includes('Google')
      ) || voices.find((v) => v.lang.startsWith('en'));

      if (britishOrEnglishVoice) {
        utterance.voice = britishOrEnglishVoice;
      }

      utterance.onend = () => {
        setIsPlaying(false);
        setAudioProgress(100);
        if (timerRef.current) clearInterval(timerRef.current);
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        if (timerRef.current) clearInterval(timerRef.current);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);

      // Simulate progress bar based on approximate duration
      const wordCount = speechText.split(/\s+/).length;
      const totalEstimatedSeconds = (wordCount / 140) * 60; // ~140 wpm
      let elapsed = 0;

      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        elapsed += 0.5;
        const pct = Math.min(99, (elapsed / totalEstimatedSeconds) * 100);
        setAudioProgress(pct);
      }, 500);
    }
  };

  const handleResetAudio = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setAudioProgress(0);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleChangeSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    if (isPlaying) {
      handleResetAudio();
    }
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Text scaling based on accessibility settings
  const fontClass =
    fontSize === 'large'
      ? 'text-lg'
      : fontSize === 'extralarge'
      ? 'text-xl'
      : 'text-base';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 h-full min-h-[calc(100vh-140px)]">
      {/* Left Pane: Listening Audio Station & Sections */}
      <div className={`lg:col-span-5 border-r p-6 overflow-y-auto space-y-6 ${
        contrastTheme === 'dark'
          ? 'border-slate-800 bg-slate-900/50'
          : contrastTheme === 'yellow-black'
          ? 'border-yellow-600 bg-black'
          : 'border-slate-200 bg-slate-50/50'
      }`}>
        {/* Section Tabs */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Select Section
            </span>
            <span className="text-xs text-slate-500">Questions 1-40</span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {sections.map((sec, idx) => {
              const isSelected = activeSectionIdx === idx;
              const answeredInSection = sec.questions.filter(
                (q) => userAnswers[q.id] !== undefined && userAnswers[q.id] !== ''
              ).length;

              return (
                <button
                  key={sec.id}
                  onClick={() => {
                    handleResetAudio();
                    setActiveSectionIdx(idx);
                    onSelectQuestion(sec.questions[0].id);
                  }}
                  className={`p-2 rounded-lg border text-xs text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-700 text-white border-blue-700 font-bold shadow-sm'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-semibold">Sec {sec.id}</div>
                  <div className="text-[10px] opacity-80">
                    {answeredInSection}/10 done
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Audio Player Deck */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                Official Audio Stream
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span>Speed:</span>
              {[0.8, 1.0, 1.2].map((s) => (
                <button
                  key={s}
                  onClick={() => handleChangeSpeed(s)}
                  className={`px-1.5 py-0.5 rounded text-xs transition-colors cursor-pointer ${
                    playbackSpeed === s
                      ? 'bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Audio Waveform Simulation */}
          <div className="h-14 bg-slate-900 rounded-lg p-2.5 flex items-center justify-center gap-1 overflow-hidden">
            {Array.from({ length: 32 }).map((_, i) => {
              const height = isPlaying
                ? Math.max(15, Math.sin(i * 0.4 + Date.now() / 300) * 80 + 30)
                : 20;
              return (
                <div
                  key={i}
                  style={{ height: `${height}%` }}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    isPlaying ? 'bg-cyan-400' : 'bg-slate-700'
                  }`}
                />
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-300"
                style={{ width: `${audioProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>{isPlaying ? 'Playing Audio...' : 'Ready'}</span>
              <span>{Math.round(audioProgress)}%</span>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={handleResetAudio}
              className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
              title="Restart Audio"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleTogglePlay}
              className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-95"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-white" />
                  <span>Pause Narration</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Play Section Audio</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className={`p-2 rounded transition-colors text-xs flex items-center gap-1 cursor-pointer ${
                showTranscript
                  ? 'text-blue-700 bg-blue-50 dark:bg-blue-900/40 font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Toggle Audio Transcript"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Script</span>
            </button>
          </div>
        </div>

        {/* Section Context & Guidance */}
        <div className="space-y-3">
          <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-white dark:bg-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {activeSection.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              {activeSection.scenario}
            </p>
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-500 flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Listen once only, as in the real computer-delivered IELTS exam.</span>
            </div>
          </div>

          {/* Optional Transcript Box (for self-study / learner review) */}
          {showTranscript && (
            <div className="border border-blue-200 dark:border-blue-900/60 rounded-xl p-4 bg-blue-50/70 dark:bg-blue-950/30 text-xs leading-relaxed space-y-2">
              <div className="flex items-center justify-between text-blue-800 dark:text-blue-300 font-bold">
                <span>Audio Transcript (Learner Reference)</span>
                <span className="text-[10px] bg-blue-200 dark:bg-blue-900 px-1.5 py-0.5 rounded">Practice Aid</span>
              </div>
              <div className="font-mono text-slate-700 dark:text-slate-300 whitespace-pre-line text-xs max-h-56 overflow-y-auto pr-2">
                {activeSection.transcript}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Pane: Questions Deck (10 per section) */}
      <div className="lg:col-span-7 p-6 overflow-y-auto space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-700 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Questions {activeSection.questions[0].id}–{activeSection.questions[activeSection.questions.length - 1].id}
            </h2>
            <p className="text-xs text-slate-500">
              Answer the questions as you listen. Write ONE WORD AND/OR A NUMBER for each answer where required.
            </p>
          </div>
          <span className="text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-slate-700 dark:text-slate-300">
            {activeSection.questions.filter((q) => userAnswers[q.id]).length} / {activeSection.questions.length} Answered
          </span>
        </div>

        {/* Question Items */}
        <div className="space-y-6">
          {activeSection.questions.map((q) => {
            const isActive = q.id === activeQuestionId;
            const currentAnswer = userAnswers[q.id] || '';

            return (
              <div
                key={q.id}
                id={`q-${q.id}`}
                onClick={() => onSelectQuestion(q.id)}
                className={`p-4 rounded-xl border transition-all ${
                  isActive
                    ? 'border-blue-600 bg-blue-50/20 dark:bg-blue-950/20 ring-1 ring-blue-600'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded text-xs font-bold flex items-center justify-center shrink-0 ${
                    isActive
                      ? 'bg-blue-700 text-white'
                      : currentAnswer
                      ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}>
                    {q.id}
                  </div>

                  <div className="flex-1 space-y-3">
                    <p className={`font-medium ${fontClass} text-slate-900 dark:text-slate-100`}>
                      {q.prompt}
                    </p>

                    {/* Multiple Choice question type */}
                    {q.type === 'multiple_choice' && q.options && (
                      <div className="space-y-2 pt-1">
                        {q.options.map((option, optIdx) => {
                          const isOptionSelected = currentAnswer === option;
                          return (
                            <label
                              key={optIdx}
                              className={`flex items-center gap-3 p-2.5 rounded-lg border text-sm transition-colors cursor-pointer ${
                                isOptionSelected
                                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-semibold'
                                  : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              <input
                                type="radio"
                                name={`question-${q.id}`}
                                value={option}
                                checked={isOptionSelected}
                                onChange={() => onAnswerQuestion(q.id, option)}
                                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                              />
                              <span>{option}</span>
                            </label>
                          );
                        })}
                      </div>
                    )}

                    {/* Fill in blank / short answer input */}
                    {(q.type === 'fill_blank' || q.type === 'short_answer') && (
                      <div className="pt-1 flex items-center gap-2 max-w-md">
                        <input
                          type="text"
                          value={currentAnswer}
                          onChange={(e) => onAnswerQuestion(q.id, e.target.value)}
                          placeholder="Type your answer here..."
                          className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
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
