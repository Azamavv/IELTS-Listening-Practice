import React from 'react';
import { 
  Headphones, 
  BookOpen, 
  PenTool, 
  Mic, 
  CheckCircle2, 
  Clock, 
  Award, 
  Sparkles, 
  Zap, 
  ArrowRight,
  ShieldCheck,
  Globe2
} from 'lucide-react';
import { SkillType } from '../types/ielts';

interface HeroProps {
  onStartFullExam: () => void;
  onStartSkillExam: (skill: SkillType) => void;
  onOpenCalculator: () => void;
  onOpenDescriptors: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartFullExam,
  onStartSkillExam,
  onOpenCalculator,
  onOpenDescriptors,
}) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Main Hero Split View */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Brief & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span>100% Free Forever · No Paywall · No Signup Required</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] text-balance">
              Free Online IELTS Mock Exam for Students & English Learners
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              Experience the authentic computer-delivered IELTS exam without spending a penny. 
              Complete all 4 test modules—Listening, Reading, Writing, and Speaking—with realistic exam timing, split-screen reading, passage highlighters, and instant diagnostic Band 9 scoring.
            </p>

            {/* Quick Proof Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Subscription or Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Authentic CD IELTS Interface</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Official 9-Band Calculations</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>AI Writing & Speaking Feedback</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Official 2h 45m Timed Engine</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Academic & General Modules</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onStartFullExam}
                className="px-6 py-3.5 text-base font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 active:scale-95 cursor-pointer"
              >
                <span>Start Full Mock Exam Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={onOpenCalculator}
                className="px-5 py-3.5 text-base font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Band Calculator
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-full min-h-[360px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
              <img
                src="/src/assets/images/ielts_hero_student_1793112951733.jpg"
                alt="Student taking online IELTS mock exam"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Free Full Test Simulation</span>
                </div>
                <h3 className="text-lg font-bold text-white">Computer-Delivered IELTS Simulation</h3>
                <p className="text-xs text-slate-200 mt-1">
                  Full 40 Listening items, 40 Reading items, 2 Writing tasks with AI examiner, and 3-part interactive Speaking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Skill Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="border-t border-slate-200 pt-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">Practice Modules</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
                Take Individual Skills or Complete the Entire Exam
              </h2>
            </div>
            <p className="text-sm text-slate-600 max-w-md">
              Short on time? You can practice any single skill independently, or take all four in sequence to calculate your estimated overall Band score.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Listening Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Headphones className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">Listening</h3>
                    <span className="text-xs font-medium text-slate-500">30 Mins</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">4 Sections · 40 Questions</p>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Audio conversations, monologues, academic tutorials, and lectures with realistic British/international narrations.
                </p>
              </div>
              <button
                onClick={() => onStartSkillExam('listening')}
                className="mt-6 w-full py-2.5 px-4 text-xs font-bold text-blue-700 hover:text-white bg-blue-50 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Practice Listening</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Reading Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">Reading</h3>
                    <span className="text-xs font-medium text-slate-500">60 Mins</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">3 Passages · 40 Questions</p>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Authentic split-screen format. True/False/Not Given, matching headings, summary completion, plus text highlighter tool.
                </p>
              </div>
              <button
                onClick={() => onStartSkillExam('reading')}
                className="mt-6 w-full py-2.5 px-4 text-xs font-bold text-emerald-700 hover:text-white bg-emerald-50 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Practice Reading</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Writing Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                  <PenTool className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">Writing</h3>
                    <span className="text-xs font-medium text-slate-500">60 Mins</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Task 1 (150w) & Task 2 (250w)</p>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Interactive word counter and prompt diagrams. Instant AI Examiner scoring across all 4 official assessment criteria.
                </p>
              </div>
              <button
                onClick={() => onStartSkillExam('writing')}
                className="mt-6 w-full py-2.5 px-4 text-xs font-bold text-amber-700 hover:text-white bg-amber-50 hover:bg-amber-700 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Practice Writing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Speaking Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
                  <Mic className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">Speaking</h3>
                    <span className="text-xs font-medium text-slate-500">11-14 Mins</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">3 Parts · Full Interview</p>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Interactive voice examiner. 1-minute cue card preparation timer, audio recorder, and diagnostic pronunciation & fluency feedback.
                </p>
              </div>
              <button
                onClick={() => onStartSkillExam('speaking')}
                className="mt-6 w-full py-2.5 px-4 text-xs font-bold text-purple-700 hover:text-white bg-purple-50 hover:bg-purple-700 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Practice Speaking</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why 100% Free - Clear Education Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-md">
              <Zap className="w-3.5 h-3.5" />
              <span>Democratizing Global Higher Education</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Why Our IELTS Mock Exam is 100% Free
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Official IELTS test registration fees often exceed $250–$300, and commercial mock test subscriptions can cost hundreds more. 
              We believe international students, university applicants, and English learners worldwide deserve equal access to realistic, high-quality test preparation without hidden fees or paywalls.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={onStartFullExam}
                className="px-5 py-3 text-sm font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>Take Complete Exam (No Sign-Up)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenDescriptors}
                className="px-5 py-3 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                View Official Band Rubrics
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
