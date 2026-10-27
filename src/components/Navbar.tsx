import React from 'react';
import { BookOpen, Award, BarChart3, History, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onStartExam: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onStartExam }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Brand wordmark */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 text-left group cursor-pointer shrink-0"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-lg tracking-wider shadow-sm group-hover:bg-blue-800 transition-colors">
            IE
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors whitespace-nowrap">
              IELTSprep
            </span>
            <span className="hidden sm:inline-block text-xs font-semibold uppercase tracking-wider text-emerald-600 ml-2 py-0.5 px-1.5 bg-emerald-50 rounded">
              100% Free
            </span>
          </div>
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigate('home')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 ${
              currentView === 'home' ? 'text-blue-700 font-semibold' : ''
            }`}
          >
            Home & Overview
          </button>
          <button
            onClick={() => onNavigate('skills')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 ${
              currentView === 'skills' ? 'text-blue-700 font-semibold' : ''
            }`}
          >
            Practice by Skill
          </button>
          <button
            onClick={() => onNavigate('calculator')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 ${
              currentView === 'calculator' ? 'text-blue-700 font-semibold' : ''
            }`}
          >
            Band Calculator
          </button>
          <button
            onClick={() => onNavigate('rubric')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 ${
              currentView === 'rubric' ? 'text-blue-700 font-semibold' : ''
            }`}
          >
            Band Descriptors
          </button>
          <button
            onClick={() => onNavigate('history')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 ${
              currentView === 'history' ? 'text-blue-700 font-semibold' : ''
            }`}
          >
            Past Results
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onStartExam}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 active:scale-95 transition-all shadow-sm flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Take Free Mock Exam</span>
          </button>
        </div>
      </div>
    </header>
  );
};
