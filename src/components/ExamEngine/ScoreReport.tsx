import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  Printer, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Download, 
  HelpCircle,
  TrendingUp,
  FileText
} from 'lucide-react';
import { TestResultRecord, BaseQuestion } from '../../types/ielts';
import { CEFR_MAPPING } from '../../data/bandCalculatorData';

interface ScoreReportProps {
  result: TestResultRecord;
  listeningQuestions?: BaseQuestion[];
  readingQuestions?: BaseQuestion[];
  onRetakeExam: () => void;
  onGoHome: () => void;
}

export const ScoreReport: React.FC<ScoreReportProps> = ({
  result,
  listeningQuestions = [],
  readingQuestions = [],
  onRetakeExam,
  onGoHome,
}) => {
  // Fire celebration confetti when report loads
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // safe fallback
    }
  }, []);

  const cefrInfo = CEFR_MAPPING[result.overallBand] || {
    level: 'B2',
    descriptor: 'Competent User - Effective operational command of the English language.',
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Top Banner & Print Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6 print:hidden">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
            Official Simulation Complete
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            IELTS Mock Exam Test Report Form
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Standard computer-delivered diagnostic evaluation · 100% Free Practice
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
          <button
            onClick={onRetakeExam}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Exam</span>
          </button>
        </div>
      </div>

      {/* Official Test Report Form (TRF) Certificate Card */}
      <div className="bg-white rounded-2xl border-2 border-slate-300 shadow-md p-6 sm:p-10 space-y-8 relative overflow-hidden">
        {/* Certificate Watermark / Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b-2 border-slate-900 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-red-700 text-white font-black text-sm tracking-widest rounded">
                IELTS
              </span>
              <span className="text-xs font-bold uppercase text-slate-600 tracking-wider">
                Official Test Report Form (Practice Edition)
              </span>
            </div>
            <h2 className="text-xl font-black text-slate-900">
              {result.testTitle}
            </h2>
            <div className="flex items-center gap-3 text-xs text-slate-500 pt-1 font-mono">
              <span>Candidate: {result.candidateName}</span>
              <span>·</span>
              <span>Candidate No: {result.candidateNumber}</span>
              <span>·</span>
              <span>Date: {new Date(result.timestamp).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Overall Band Big Score Box */}
          <div className="bg-slate-900 text-white p-4 rounded-xl text-center min-w-[140px] shadow-sm">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Overall Band Score
            </div>
            <div className="text-4xl font-black font-mono mt-1 text-emerald-400">
              {result.overallBand.toFixed(1)}
            </div>
            <div className="text-xs font-semibold text-slate-300 mt-0.5">
              CEFR Level: {cefrInfo.level}
            </div>
          </div>
        </div>

        {/* 4 Skills Scores Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Listening */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-center">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Listening
            </div>
            <div className="text-3xl font-extrabold font-mono text-blue-700">
              {result.listeningScore?.band.toFixed(1) || '—'}
            </div>
            {result.listeningScore && (
              <div className="text-[11px] text-slate-500">
                Raw Score: {result.listeningScore.raw} / 40
              </div>
            )}
          </div>

          {/* Reading */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-center">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Reading
            </div>
            <div className="text-3xl font-extrabold font-mono text-emerald-700">
              {result.readingScore?.band.toFixed(1) || '—'}
            </div>
            {result.readingScore && (
              <div className="text-[11px] text-slate-500">
                Raw Score: {result.readingScore.raw} / 40
              </div>
            )}
          </div>

          {/* Writing */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-center">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Writing
            </div>
            <div className="text-3xl font-extrabold font-mono text-amber-700">
              {result.writingResult?.evaluation?.overallBand.toFixed(1) || '—'}
            </div>
            <div className="text-[11px] text-slate-500">
              {result.writingResult?.evaluation ? 'AI Evaluated' : 'Not submitted'}
            </div>
          </div>

          {/* Speaking */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-center">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Speaking
            </div>
            <div className="text-3xl font-extrabold font-mono text-purple-700">
              {result.speakingResult?.evaluation?.overallBand.toFixed(1) || '—'}
            </div>
            <div className="text-[11px] text-slate-500">
              {result.speakingResult?.evaluation ? 'AI Evaluated' : 'Not submitted'}
            </div>
          </div>
        </div>

        {/* CEFR Descriptor Explanation */}
        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <Award className="w-4 h-4 text-blue-700" />
            <span>Candidate Competency Assessment: {cefrInfo.level} ({result.overallBand.toFixed(1)})</span>
          </div>
          <p className="leading-relaxed text-blue-950">
            {cefrInfo.descriptor}
          </p>
        </div>

        {/* Writing & Speaking Diagnostic Summaries */}
        {(result.writingResult?.evaluation || result.speakingResult?.evaluation) && (
          <div className="space-y-4 pt-2">
            <h3 className="text-base font-bold text-slate-900">
              Examiner Qualitative Diagnostic Commentary
            </h3>

            {result.writingResult?.evaluation && (
              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-2 text-xs">
                <div className="flex justify-between items-center font-bold text-amber-900">
                  <span>Writing Examiner Assessment</span>
                  <span>Band {result.writingResult.evaluation.overallBand.toFixed(1)}</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {result.writingResult.evaluation.examinerFeedback}
                </p>
              </div>
            )}

            {result.speakingResult?.evaluation && (
              <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50 space-y-2 text-xs">
                <div className="flex justify-between items-center font-bold text-purple-900">
                  <span>Speaking Examiner Assessment</span>
                  <span>Band {result.speakingResult.evaluation.overallBand.toFixed(1)}</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {result.speakingResult.evaluation.examinerNotes}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Detailed Question-by-Question Review Sections */}
      <div className="space-y-8 print:hidden">
        <h2 className="text-xl font-bold text-slate-900">
          Detailed Question Review & Explanations
        </h2>

        {/* Listening Review */}
        {result.listeningScore && listeningQuestions.length > 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-slate-900">
                Listening Section Review ({result.listeningScore.raw} / 40 Correct)
              </h3>
              <span className="text-xs font-semibold px-2 py-1 bg-blue-50 text-blue-700 rounded">
                Band {result.listeningScore.band.toFixed(1)}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {listeningQuestions.map((q) => {
                const userAns = result.listeningScore?.userAnswers[q.id] || '(No Answer)';
                const isCorrect = Array.isArray(q.correctAnswer)
                  ? q.correctAnswer.some((ans) => ans.toLowerCase().trim() === userAns.toLowerCase().trim())
                  : q.correctAnswer.toLowerCase().trim() === userAns.toLowerCase().trim();

                const displayCorrect = Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`p-3 rounded-lg border text-xs space-y-1.5 ${
                      isCorrect ? 'border-emerald-200 bg-emerald-50/40' : 'border-red-200 bg-red-50/40'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-slate-700">Question {q.id}</span>
                      {isCorrect ? (
                        <span className="flex items-center gap-1 text-emerald-700">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-600">
                          <XCircle className="w-3.5 h-3.5" /> Incorrect
                        </span>
                      )}
                    </div>
                    <p className="text-slate-800 font-medium line-clamp-1">{q.prompt}</p>
                    <div className="flex items-center gap-2 pt-1 text-[11px]">
                      <span className="text-slate-500">Your answer: <strong>{userAns}</strong></span>
                      {!isCorrect && (
                        <span className="text-emerald-700">Correct: <strong>{displayCorrect}</strong></span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 italic pt-0.5">
                      {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Reading Review */}
        {result.readingScore && readingQuestions.length > 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-slate-900">
                Reading Section Review ({result.readingScore.raw} / 40 Correct)
              </h3>
              <span className="text-xs font-semibold px-2 py-1 bg-emerald-50 text-emerald-700 rounded">
                Band {result.readingScore.band.toFixed(1)}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {readingQuestions.map((q) => {
                const userAns = result.readingScore?.userAnswers[q.id] || '(No Answer)';
                const isCorrect = Array.isArray(q.correctAnswer)
                  ? q.correctAnswer.some((ans) => ans.toLowerCase().trim() === userAns.toLowerCase().trim())
                  : q.correctAnswer.toLowerCase().trim() === userAns.toLowerCase().trim();

                const displayCorrect = Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`p-3 rounded-lg border text-xs space-y-1.5 ${
                      isCorrect ? 'border-emerald-200 bg-emerald-50/40' : 'border-red-200 bg-red-50/40'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-slate-700">Question {q.id}</span>
                      {isCorrect ? (
                        <span className="flex items-center gap-1 text-emerald-700">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-600">
                          <XCircle className="w-3.5 h-3.5" /> Incorrect
                        </span>
                      )}
                    </div>
                    <p className="text-slate-800 font-medium line-clamp-1">{q.prompt}</p>
                    <div className="flex items-center gap-2 pt-1 text-[11px]">
                      <span className="text-slate-500">Your answer: <strong>{userAns}</strong></span>
                      {!isCorrect && (
                        <span className="text-emerald-700">Correct: <strong>{displayCorrect}</strong></span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 italic pt-0.5">
                      {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-slate-200 print:hidden">
        <button
          onClick={onGoHome}
          className="px-5 py-2.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          Return to Overview
        </button>
        <button
          onClick={onRetakeExam}
          className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-2"
        >
          <span>Practice Another Mock Exam</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
