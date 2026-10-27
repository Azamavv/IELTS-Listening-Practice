import React from 'react';
import { Award, Calendar, Trash2, ArrowRight, BookOpen, Clock, FileCheck } from 'lucide-react';
import { TestResultRecord } from '../types/ielts';

interface TestHistoryViewProps {
  history: TestResultRecord[];
  onSelectResult: (record: TestResultRecord) => void;
  onClearHistory: () => void;
  onStartExam: () => void;
}

export const TestHistoryView: React.FC<TestHistoryViewProps> = ({
  history,
  onSelectResult,
  onClearHistory,
  onStartExam,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
            Performance History
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Past IELTS Mock Exam Results
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track your Band score progression, component breakdown, and diagnostic score reports.
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Saved History</span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 max-w-md mx-auto shadow-xs">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Mock Exams Completed Yet</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Take your first 100% free IELTS mock exam to receive a complete diagnostic report form with overall band scores and examiner commentary.
          </p>
          <button
            onClick={onStartExam}
            className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            Take Free Mock Exam
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {history.map((record) => (
            <div
              key={record.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-blue-400 hover:shadow-sm transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {record.testType.toUpperCase()}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    ID: {record.candidateNumber}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {record.testTitle}
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-500 pt-0.5">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(record.timestamp).toLocaleDateString()}
                  </span>
                  <span>·</span>
                  <span>Candidate: {record.candidateName}</span>
                </div>
              </div>

              {/* Scores breakdown mini badges */}
              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                <div className="flex items-center gap-2 text-center text-xs">
                  {record.listeningScore && (
                    <div className="px-2 py-1 bg-slate-50 rounded border border-slate-200">
                      <div className="text-[10px] text-slate-500">L</div>
                      <div className="font-mono font-bold text-blue-700">
                        {record.listeningScore.band.toFixed(1)}
                      </div>
                    </div>
                  )}
                  {record.readingScore && (
                    <div className="px-2 py-1 bg-slate-50 rounded border border-slate-200">
                      <div className="text-[10px] text-slate-500">R</div>
                      <div className="font-mono font-bold text-emerald-700">
                        {record.readingScore.band.toFixed(1)}
                      </div>
                    </div>
                  )}
                  {record.writingResult?.evaluation && (
                    <div className="px-2 py-1 bg-slate-50 rounded border border-slate-200">
                      <div className="text-[10px] text-slate-500">W</div>
                      <div className="font-mono font-bold text-amber-700">
                        {record.writingResult.evaluation.overallBand.toFixed(1)}
                      </div>
                    </div>
                  )}
                  {record.speakingResult?.evaluation && (
                    <div className="px-2 py-1 bg-slate-50 rounded border border-slate-200">
                      <div className="text-[10px] text-slate-500">S</div>
                      <div className="font-mono font-bold text-purple-700">
                        {record.speakingResult.evaluation.overallBand.toFixed(1)}
                      </div>
                    </div>
                  )}
                </div>

                {/* Overall Big Tag */}
                <div className="text-center px-3 py-1.5 bg-slate-900 text-white rounded-lg">
                  <div className="text-[9px] uppercase tracking-wider text-slate-400">Band</div>
                  <div className="text-lg font-black font-mono text-emerald-400 leading-none">
                    {record.overallBand.toFixed(1)}
                  </div>
                </div>

                <button
                  onClick={() => onSelectResult(record)}
                  className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                >
                  <span>View TRF Report</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
