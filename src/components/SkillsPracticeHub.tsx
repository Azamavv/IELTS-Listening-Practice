import React from 'react';
import { 
  Headphones, 
  BookOpen, 
  PenTool, 
  Mic, 
  Award, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Zap
} from 'lucide-react';
import { SkillType } from '../types/ielts';

interface SkillsPracticeHubProps {
  onStartFullExam: () => void;
  onStartSkill: (skill: SkillType) => void;
  onOpenCalculator: () => void;
  onOpenDescriptors: () => void;
}

export const SkillsPracticeHub: React.FC<SkillsPracticeHubProps> = ({
  onStartFullExam,
  onStartSkill,
  onOpenCalculator,
  onOpenDescriptors,
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
          Targeted IELTS Preparation
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Practice by Skill or Full Simulation
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Select an individual skill to sharpen specific exam competencies, or sit the full continuous mock test to simulate real test day conditions.
        </p>
      </div>

      {/* Featured Full Exam Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
            <Sparkles className="w-4 h-4" />
            <span>Recommended for Test Readiness</span>
          </div>
          <h2 className="text-2xl font-black">
            Complete IELTS Academic Mock Examination
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
            Full 2h 45m battery including Listening (40 Qs), Reading (40 Qs), Writing Tasks 1 & 2, and Speaking interview with an aggregated Official Test Report Form.
          </p>
        </div>

        <button
          onClick={onStartFullExam}
          className="px-6 py-3.5 bg-white hover:bg-slate-50 text-blue-800 font-extrabold rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer active:scale-95 shrink-0"
        >
          <span>Start Full Exam Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 4 Skill Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Listening */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between hover:border-blue-400 hover:shadow-sm transition-all space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Listening Practice</h3>
                <span className="text-xs font-bold text-slate-500 font-mono">30 Mins · 40 Qs</span>
              </div>
              <p className="text-xs text-blue-700 font-medium mt-0.5">
                4 Sections · Forms, Multiple Choice, Blank Filling
              </p>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Listen to native English conversations, radio broadcasts, university student tutorials, and architectural lectures. Practice taking notes and answering questions simultaneously.
            </p>
            <ul className="text-xs text-slate-500 space-y-1">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Audio player with variable speed & simulated sound waves</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Instant automated scoring and line-by-line script review</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onStartSkill('listening')}
            className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Launch Listening Module</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Reading */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between hover:border-emerald-400 hover:shadow-sm transition-all space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Reading Practice</h3>
                <span className="text-xs font-bold text-slate-500 font-mono">60 Mins · 40 Qs</span>
              </div>
              <p className="text-xs text-emerald-700 font-medium mt-0.5">
                3 Passages · True/False/Not Given, Headings, Summaries
              </p>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Academic texts covering coastal mangrove ecosystems, cognitive neuroscience in bilingualism, and the geopolitics of deep-sea ocean floor mining.
            </p>
            <ul className="text-xs text-slate-500 space-y-1">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Interactive text highlighter and candidate scratchpad</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Official CD IELTS split-screen passage layout</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onStartSkill('reading')}
            className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Launch Reading Module</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Writing */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between hover:border-amber-400 hover:shadow-sm transition-all space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <PenTool className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Writing Practice</h3>
                <span className="text-xs font-bold text-slate-500 font-mono">60 Mins · 2 Tasks</span>
              </div>
              <p className="text-xs text-amber-700 font-medium mt-0.5">
                Task 1 (Data Report) & Task 2 (Discursive Essay)
              </p>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Write under authentic test conditions with live word counting. Receive instant examiner grading broken down into the 4 official assessment rubrics.
            </p>
            <ul className="text-xs text-slate-500 space-y-1">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Gemini-powered senior examiner scoring (Bands 1.0–9.0)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Vocabulary collocations & Band 9 model excerpts</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onStartSkill('writing')}
            className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Launch Writing Module</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Speaking */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between hover:border-purple-400 hover:shadow-sm transition-all space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Mic className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Speaking Practice</h3>
                <span className="text-xs font-bold text-slate-500 font-mono">11–14 Mins · 3 Parts</span>
              </div>
              <p className="text-xs text-purple-700 font-medium mt-0.5">
                Personal, Cue Card (Long Turn), & Analytical Discussion
              </p>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Interactive 1-on-1 interview with examiner voice read-aloud, microphone recording, 1-minute cue card preparation timer, and AI pronunciation analysis.
            </p>
            <ul className="text-xs text-slate-500 space-y-1">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Voice examiner audio prompt narration</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Detailed feedback on Fluency, Lexis, and Grammar</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onStartSkill('speaking')}
            className="w-full py-3 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Launch Speaking Module</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
