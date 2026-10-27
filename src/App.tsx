/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SkillsPracticeHub } from './components/SkillsPracticeHub';
import { ExamHeader } from './components/ExamEngine/ExamHeader';
import { ExamFooter } from './components/ExamEngine/ExamFooter';
import { ListeningTest } from './components/ExamEngine/ListeningTest';
import { ReadingTest } from './components/ExamEngine/ReadingTest';
import { WritingTest } from './components/ExamEngine/WritingTest';
import { SpeakingTest } from './components/ExamEngine/SpeakingTest';
import { ScoreReport } from './components/ExamEngine/ScoreReport';
import { NotepadDrawer } from './components/ExamEngine/NotepadDrawer';
import { BandScoreCalculatorModal } from './components/BandScoreCalculatorModal';
import { BandDescriptorsModal } from './components/BandDescriptorsModal';
import { TestHistoryView } from './components/TestHistoryView';

import { MOCK_TESTS } from './data/mockTests';
import {
  calculateListeningBand,
  calculateReadingAcademicBand,
  calculateOverallBand,
} from './data/bandCalculatorData';
import {
  SkillType,
  TestResultRecord,
  WritingEvaluation,
  SpeakingEvaluation,
} from './types/ielts';

const ACTIVE_TEST = MOCK_TESTS[0];

export default function App() {
  // Navigation & View state
  const [currentView, setCurrentView] = useState<'home' | 'skills' | 'exam' | 'report' | 'history'>('home');
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isDescriptorsOpen, setIsDescriptorsOpen] = useState(false);
  const [isNotepadOpen, setIsNotepadOpen] = useState(false);

  // Exam Configuration
  const [isFullExamMode, setIsFullExamMode] = useState(true);
  const [activeSkill, setActiveSkill] = useState<SkillType>('listening');
  const [activeQuestionId, setActiveQuestionId] = useState<number>(1);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [listeningAnswers, setListeningAnswers] = useState<Record<number, string>>({});
  const [readingAnswers, setReadingAnswers] = useState<Record<number, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());

  // Writing & Speaking states
  const [task1Text, setTask1Text] = useState('');
  const [task2Text, setTask2Text] = useState('');
  const [writingEvaluation, setWritingEvaluation] = useState<WritingEvaluation | undefined>();
  const [speakingNotes, setSpeakingNotes] = useState<Record<number, string>>({});
  const [speakingEvaluation, setSpeakingEvaluation] = useState<SpeakingEvaluation | undefined>();

  // Candidate Digital Scratchpad
  const [candidateNotes, setCandidateNotes] = useState('');

  // Accessibility & Interface Themes
  const [fontSize, setFontSize] = useState<'standard' | 'large' | 'extralarge'>('standard');
  const [contrastTheme, setContrastTheme] = useState<'light' | 'dark' | 'yellow-black'>('light');
  const [activeHighlightColor, setActiveHighlightColor] = useState<string | null>(null);

  // Timer state
  const [remainingSeconds, setRemainingSeconds] = useState<number>(30 * 60);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [showTimer, setShowTimer] = useState(true);

  // Results & History
  const [currentResult, setCurrentResult] = useState<TestResultRecord | null>(null);
  const [testHistory, setTestHistory] = useState<TestResultRecord[]>(() => {
    try {
      const saved = localStorage.getItem('ielts_mock_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Countdown Timer effect during exam
  useEffect(() => {
    if (currentView !== 'exam' || isTimerPaused) return;

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto submit or transition section
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentView, isTimerPaused]);

  // Start Full Mock Exam
  const handleStartFullExam = () => {
    setIsFullExamMode(true);
    setActiveSkill('listening');
    setActiveQuestionId(1);
    setUserAnswers({});
    setListeningAnswers({});
    setReadingAnswers({});
    setFlaggedQuestions(new Set());
    setTask1Text('');
    setTask2Text('');
    setWritingEvaluation(undefined);
    setSpeakingNotes({});
    setSpeakingEvaluation(undefined);
    setCandidateNotes('');
    setRemainingSeconds(30 * 60); // 30 mins for Listening
    setIsTimerPaused(false);
    setCurrentView('exam');
  };

  // Start Individual Skill Practice
  const handleStartSkillExam = (skill: SkillType) => {
    setIsFullExamMode(false);
    setActiveSkill(skill);
    setActiveQuestionId(1);
    setUserAnswers({});
    setListeningAnswers({});
    setReadingAnswers({});
    setFlaggedQuestions(new Set());
    setCandidateNotes('');
    setIsTimerPaused(false);

    if (skill === 'listening') setRemainingSeconds(30 * 60);
    else if (skill === 'reading') setRemainingSeconds(60 * 60);
    else if (skill === 'writing') setRemainingSeconds(60 * 60);
    else if (skill === 'speaking') setRemainingSeconds(14 * 60);

    setCurrentView('exam');
  };

  // Answer handler
  const handleAnswerQuestion = (qId: number, answer: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [qId]: answer,
    }));
    if (activeSkill === 'listening') {
      setListeningAnswers((prev) => ({ ...prev, [qId]: answer }));
    } else if (activeSkill === 'reading') {
      setReadingAnswers((prev) => ({ ...prev, [qId]: answer }));
    }
  };

  // Toggle question review flag
  const handleToggleFlag = (qId: number) => {
    setFlaggedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });
  };

  // Next / Previous questions
  const totalQuestionsInCurrentSkill =
    activeSkill === 'listening' ? 40 : activeSkill === 'reading' ? 40 : 1;

  const handleNextQuestion = () => {
    if (activeQuestionId < totalQuestionsInCurrentSkill) {
      setActiveQuestionId((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (activeQuestionId > 1) {
      setActiveQuestionId((prev) => prev - 1);
    }
  };

  // Calculate Listening raw marks (0 to 40)
  const calculateListeningScore = () => {
    let raw = 0;
    const allListeningQuestions = ACTIVE_TEST.listening.flatMap((s) => s.questions);
    const answers = Object.keys(listeningAnswers).length > 0 ? listeningAnswers : userAnswers;
    allListeningQuestions.forEach((q) => {
      const userAns = (answers[q.id] || '').trim().toLowerCase();
      if (!userAns) return;

      if (Array.isArray(q.correctAnswer)) {
        if (q.correctAnswer.some((ans) => ans.toLowerCase().trim() === userAns)) {
          raw += 1;
        }
      } else if (q.correctAnswer.toLowerCase().trim() === userAns) {
        raw += 1;
      }
    });

    const band = calculateListeningBand(raw);
    return { raw, band, total: 40, userAnswers: { ...answers } };
  };

  // Calculate Reading raw marks (0 to 40)
  const calculateReadingScore = () => {
    let raw = 0;
    const allReadingQuestions = ACTIVE_TEST.reading.flatMap((p) => p.questions);
    const answers = Object.keys(readingAnswers).length > 0 ? readingAnswers : userAnswers;
    allReadingQuestions.forEach((q) => {
      const userAns = (answers[q.id] || '').trim().toLowerCase();
      if (!userAns) return;

      if (Array.isArray(q.correctAnswer)) {
        if (q.correctAnswer.some((ans) => ans.toLowerCase().trim() === userAns)) {
          raw += 1;
        }
      } else if (q.correctAnswer.toLowerCase().trim() === userAns) {
        raw += 1;
      }
    });

    const band = calculateReadingAcademicBand(raw);
    return { raw, band, total: 40, userAnswers: { ...answers } };
  };

  // Section Progress Calculation for Circular Progress Indicator
  const getSectionProgress = () => {
    if (activeSkill === 'listening') {
      const allListeningQuestions = ACTIVE_TEST.listening.flatMap((s) => s.questions);
      const total = allListeningQuestions.length || 40;
      const currentAnswers = activeSkill === 'listening' ? userAnswers : listeningAnswers;
      const completed = allListeningQuestions.filter((q) => {
        const ans = currentAnswers[q.id];
        return ans !== undefined && ans.trim() !== '';
      }).length;
      return { completed, total };
    }

    if (activeSkill === 'reading') {
      const allReadingQuestions = ACTIVE_TEST.reading.flatMap((p) => p.questions);
      const total = allReadingQuestions.length || 40;
      const currentAnswers = activeSkill === 'reading' ? userAnswers : readingAnswers;
      const completed = allReadingQuestions.filter((q) => {
        const ans = currentAnswers[q.id];
        return ans !== undefined && ans.trim() !== '';
      }).length;
      return { completed, total };
    }

    if (activeSkill === 'writing') {
      const total = ACTIVE_TEST.writing.length || 2;
      let completed = 0;
      if (task1Text.trim().length > 0) completed += 1;
      if (task2Text.trim().length > 0) completed += 1;
      return { completed, total };
    }

    if (activeSkill === 'speaking') {
      const total = ACTIVE_TEST.speaking.length || 3;
      const completed = ACTIVE_TEST.speaking.filter(
        (part) => (speakingNotes[part.partNumber] || '').trim().length > 0
      ).length;
      return { completed, total };
    }

    return { completed: 0, total: 40 };
  };

  const { completed: completedQuestionsCount, total: totalQuestionsCount } = getSectionProgress();

  // Submit Active Section / Complete Exam
  const handleSubmitSection = () => {
    // If in full exam mode, advance to next skill
    if (isFullExamMode) {
      if (activeSkill === 'listening') {
        setActiveSkill('reading');
        setActiveQuestionId(1);
        setUserAnswers(readingAnswers);
        setFlaggedQuestions(new Set());
        setRemainingSeconds(60 * 60); // 60 mins for Reading
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      } else if (activeSkill === 'reading') {
        setActiveSkill('writing');
        setRemainingSeconds(60 * 60); // 60 mins for Writing
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      } else if (activeSkill === 'writing') {
        setActiveSkill('speaking');
        setRemainingSeconds(14 * 60); // 14 mins for Speaking
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    // Finalize Score Report
    const listeningData =
      activeSkill === 'listening' || isFullExamMode
        ? calculateListeningScore()
        : undefined;

    const readingData =
      activeSkill === 'reading' || isFullExamMode
        ? calculateReadingScore()
        : undefined;

    const lBand = listeningData ? listeningData.band : 7.0;
    const rBand = readingData ? readingData.band : 7.0;
    const wBand = writingEvaluation ? writingEvaluation.overallBand : 7.0;
    const sBand = speakingEvaluation ? speakingEvaluation.overallBand : 7.0;

    const overall = calculateOverallBand(lBand, rBand, wBand, sBand);

    const record: TestResultRecord = {
      id: `ielts-${Date.now()}`,
      timestamp: Date.now(),
      testId: ACTIVE_TEST.id,
      testTitle: ACTIVE_TEST.title,
      testType: ACTIVE_TEST.testType,
      candidateName: 'Free Test Taker',
      candidateNumber: 'GBR-048291',
      listeningScore: listeningData,
      readingScore: readingData,
      writingResult: {
        task1Response: task1Text,
        task2Response: task2Text,
        evaluation: writingEvaluation,
      },
      speakingResult: {
        notes: JSON.stringify(speakingNotes),
        evaluation: speakingEvaluation,
      },
      overallBand: overall,
    };

    setCurrentResult(record);
    const updatedHistory = [record, ...testHistory];
    setTestHistory(updatedHistory);
    try {
      localStorage.setItem('ielts_mock_history', JSON.stringify(updatedHistory));
    } catch (e) {
      // safe fallback
    }

    setCurrentView('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearHistory = () => {
    localStorage.removeItem('ielts_mock_history');
    setTestHistory([]);
  };

  // Determine container styling based on theme
  const themeContainerClass =
    contrastTheme === 'dark'
      ? 'bg-slate-950 text-slate-100 min-h-screen'
      : contrastTheme === 'yellow-black'
      ? 'bg-black text-yellow-300 min-h-screen'
      : 'bg-slate-50 text-slate-900 min-h-screen';

  return (
    <div className={themeContainerClass}>
      {/* Top Navbar in Standard Views */}
      {currentView !== 'exam' && (
        <Navbar
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view as any)}
          onStartExam={handleStartFullExam}
        />
      )}

      {/* Main View Router */}
      <main>
        {currentView === 'home' && (
          <Hero
            onStartFullExam={handleStartFullExam}
            onStartSkillExam={handleStartSkillExam}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
            onOpenDescriptors={() => setIsDescriptorsOpen(true)}
          />
        )}

        {currentView === 'skills' && (
          <SkillsPracticeHub
            onStartFullExam={handleStartFullExam}
            onStartSkill={handleStartSkillExam}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
            onOpenDescriptors={() => setIsDescriptorsOpen(true)}
          />
        )}

        {currentView === 'history' && (
          <TestHistoryView
            history={testHistory}
            onSelectResult={(rec) => {
              setCurrentResult(rec);
              setCurrentView('report');
            }}
            onClearHistory={handleClearHistory}
            onStartExam={handleStartFullExam}
          />
        )}

        {currentView === 'report' && currentResult && (
          <ScoreReport
            result={currentResult}
            listeningQuestions={ACTIVE_TEST.listening.flatMap((s) => s.questions)}
            readingQuestions={ACTIVE_TEST.reading.flatMap((p) => p.questions)}
            onRetakeExam={handleStartFullExam}
            onGoHome={() => setCurrentView('home')}
          />
        )}

        {/* Active Exam Engine */}
        {currentView === 'exam' && (
          <div className="flex flex-col min-h-screen">
            {/* Authentic CD IELTS Header */}
            <ExamHeader
              moduleTitle={`${
                activeSkill.charAt(0).toUpperCase() + activeSkill.slice(1)
              } ${
                isFullExamMode
                  ? `(Module ${
                      activeSkill === 'listening'
                        ? '1 of 4'
                        : activeSkill === 'reading'
                        ? '2 of 4'
                        : activeSkill === 'writing'
                        ? '3 of 4'
                        : '4 of 4'
                    })`
                  : 'Practice'
              }`}
              skill={activeSkill}
              remainingSeconds={remainingSeconds}
              isPaused={isTimerPaused}
              onTogglePause={() => setIsTimerPaused(!isTimerPaused)}
              fontSize={fontSize}
              onChangeFontSize={setFontSize}
              contrastTheme={contrastTheme}
              onChangeContrastTheme={setContrastTheme}
              showTimer={showTimer}
              onToggleTimer={() => setShowTimer(!showTimer)}
              isNotesOpen={isNotepadOpen}
              onToggleNotes={() => setIsNotepadOpen(!isNotepadOpen)}
              onExitExam={() => setCurrentView('home')}
              activeHighlightColor={activeHighlightColor}
              onSelectHighlightColor={setActiveHighlightColor}
              completedQuestions={completedQuestionsCount}
              totalQuestions={totalQuestionsCount}
            />

            {/* Test Stage Body */}
            <div className="flex-1">
              {activeSkill === 'listening' && (
                <ListeningTest
                  sections={ACTIVE_TEST.listening}
                  activeQuestionId={activeQuestionId}
                  onSelectQuestion={setActiveQuestionId}
                  userAnswers={userAnswers}
                  onAnswerQuestion={handleAnswerQuestion}
                  fontSize={fontSize}
                  contrastTheme={contrastTheme}
                />
              )}

              {activeSkill === 'reading' && (
                <ReadingTest
                  passages={ACTIVE_TEST.reading}
                  activeQuestionId={activeQuestionId}
                  onSelectQuestion={setActiveQuestionId}
                  userAnswers={userAnswers}
                  onAnswerQuestion={handleAnswerQuestion}
                  fontSize={fontSize}
                  contrastTheme={contrastTheme}
                  activeHighlightColor={activeHighlightColor}
                />
              )}

              {activeSkill === 'writing' && (
                <WritingTest
                  tasks={ACTIVE_TEST.writing}
                  task1Text={task1Text}
                  task2Text={task2Text}
                  onChangeTask1={setTask1Text}
                  onChangeTask2={setTask2Text}
                  evaluation={writingEvaluation}
                  onSetEvaluation={setWritingEvaluation}
                  fontSize={fontSize}
                  contrastTheme={contrastTheme}
                />
              )}

              {activeSkill === 'speaking' && (
                <SpeakingTest
                  parts={ACTIVE_TEST.speaking}
                  studentNotes={speakingNotes}
                  onChangeStudentNotes={(part, text) =>
                    setSpeakingNotes((prev) => ({ ...prev, [part]: text }))
                  }
                  evaluation={speakingEvaluation}
                  onSetEvaluation={setSpeakingEvaluation}
                  fontSize={fontSize}
                  contrastTheme={contrastTheme}
                />
              )}
            </div>

            {/* Authentic CD IELTS Footer Question Bar */}
            {(activeSkill === 'listening' || activeSkill === 'reading') && (
              <ExamFooter
                totalQuestions={40}
                currentQuestionId={activeQuestionId}
                onSelectQuestion={setActiveQuestionId}
                answeredQuestions={userAnswers}
                flaggedQuestions={flaggedQuestions}
                onToggleFlag={handleToggleFlag}
                onNext={handleNextQuestion}
                onPrevious={handlePreviousQuestion}
                onSubmit={handleSubmitSection}
                contrastTheme={contrastTheme}
                sectionName={activeSkill === 'listening' ? 'Listening' : 'Reading'}
              />
            )}

            {/* Simple navigation footer for Writing and Speaking */}
            {(activeSkill === 'writing' || activeSkill === 'speaking') && (
              <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-3 px-6 flex justify-between items-center shadow-xs">
                <div className="text-xs text-slate-500 font-medium">
                  {isFullExamMode
                    ? `Step ${activeSkill === 'writing' ? '3 of 4: Writing' : '4 of 4: Speaking'}`
                    : `${activeSkill.charAt(0).toUpperCase() + activeSkill.slice(1)} Practice`}
                </div>
                <button
                  onClick={handleSubmitSection}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
                >
                  {isFullExamMode && activeSkill === 'writing'
                    ? 'Proceed to Speaking Section'
                    : 'Complete Exam & View Test Report Form'}
                </button>
              </footer>
            )}
          </div>
        )}
      </main>

      {/* Candidate Digital Scratchpad Drawer */}
      <NotepadDrawer
        isOpen={isNotepadOpen}
        onClose={() => setIsNotepadOpen(false)}
        notes={candidateNotes}
        onChangeNotes={setCandidateNotes}
        contrastTheme={contrastTheme}
      />

      {/* Band Score Calculator Modal */}
      <BandScoreCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      {/* Band Descriptors & Rubric Modal */}
      <BandDescriptorsModal
        isOpen={isDescriptorsOpen}
        onClose={() => setIsDescriptorsOpen(false)}
      />
    </div>
  );
}
