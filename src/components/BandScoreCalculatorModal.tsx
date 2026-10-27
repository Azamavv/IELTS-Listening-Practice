import React, { useState } from 'react';
import { X, Calculator, Award, Info, Check } from 'lucide-react';
import {
  calculateListeningBand,
  calculateReadingAcademicBand,
  calculateReadingGeneralBand,
  calculateOverallBand,
  CEFR_MAPPING,
} from '../data/bandCalculatorData';

interface BandScoreCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BandScoreCalculatorModal: React.FC<BandScoreCalculatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [testType, setTestType] = useState<'academic' | 'general'>('academic');
  const [listeningRaw, setListeningRaw] = useState<number>(32);
  const [readingRaw, setReadingRaw] = useState<number>(30);
  const [writingBand, setWritingBand] = useState<number>(7.0);
  const [speakingBand, setSpeakingBand] = useState<number>(7.5);

  const listeningBand = calculateListeningBand(listeningRaw);
  const readingBand =
    testType === 'academic'
      ? calculateReadingAcademicBand(readingRaw)
      : calculateReadingGeneralBand(readingRaw);

  const overallBand = calculateOverallBand(
    listeningBand,
    readingBand,
    writingBand,
    speakingBand
  );

  const cefr = CEFR_MAPPING[overallBand] || {
    level: 'B2',
    descriptor: 'Competent User',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Official IELTS Band Score Calculator
              </h2>
              <p className="text-xs text-slate-500">
                Calculate overall 9-band scores from raw marks (40 questions)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Module Selector */}
          <div className="flex items-center justify-between p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setTestType('academic')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                testType === 'academic'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Academic Module
            </button>
            <button
              onClick={() => setTestType('general')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                testType === 'general'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              General Training Module
            </button>
          </div>

          {/* Input Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Listening */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800">Listening Raw Marks</span>
                <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  Band {listeningBand.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={listeningRaw}
                  onChange={(e) => setListeningRaw(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <span className="text-xs font-mono font-bold w-12 text-right">
                  {listeningRaw}/40
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Official scale: 30 = 7.0 · 35 = 8.0 · 39 = 9.0
              </div>
            </div>

            {/* Reading */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800">
                  Reading Raw Marks ({testType === 'academic' ? 'Academic' : 'GT'})
                </span>
                <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Band {readingBand.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={readingRaw}
                  onChange={(e) => setReadingRaw(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <span className="text-xs font-mono font-bold w-12 text-right">
                  {readingRaw}/40
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                {testType === 'academic'
                  ? 'Academic: 30 = 7.0 · 35 = 8.0 · 39 = 9.0'
                  : 'GT: 34 = 7.0 · 37 = 8.0 · 40 = 9.0'}
              </div>
            </div>

            {/* Writing Band */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800">Writing Band Score</span>
                <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  Band {writingBand.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="3.0"
                  max="9.0"
                  step="0.5"
                  value={writingBand}
                  onChange={(e) => setWritingBand(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
                <span className="text-xs font-mono font-bold w-12 text-right">
                  {writingBand.toFixed(1)}
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Assessed across 4 criteria by examiner / AI
              </div>
            </div>

            {/* Speaking Band */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800">Speaking Band Score</span>
                <span className="font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                  Band {speakingBand.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="3.0"
                  max="9.0"
                  step="0.5"
                  value={speakingBand}
                  onChange={(e) => setSpeakingBand(Number(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer"
                />
                <span className="text-xs font-mono font-bold w-12 text-right">
                  {speakingBand.toFixed(1)}
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Assessed across 4 speaking criteria
              </div>
            </div>
          </div>

          {/* Result Highlight Box */}
          <div className="bg-slate-900 text-white rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Calculated Overall Band Score
              </div>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-5xl font-black font-mono text-emerald-400">
                  {overallBand.toFixed(1)}
                </span>
                <span className="text-sm font-semibold text-slate-300">
                  CEFR: {cefr.level}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-2 max-w-sm">
                {cefr.descriptor}
              </p>
            </div>

            <div className="text-xs space-y-1 bg-slate-800 p-3.5 rounded-lg border border-slate-700">
              <div className="font-bold text-slate-200 pb-1 border-b border-slate-700">
                Official Rounding Rule:
              </div>
              <p className="text-slate-400 text-[11px]">
                Average decimal &lt; .25 rounds down to .0.
              </p>
              <p className="text-slate-400 text-[11px]">
                Average decimal .25 to &lt; .75 rounds to .5.
              </p>
              <p className="text-slate-400 text-[11px]">
                Average decimal &ge; .75 rounds up to next whole band.
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Close Calculator
          </button>
        </div>
      </div>
    </div>
  );
};
