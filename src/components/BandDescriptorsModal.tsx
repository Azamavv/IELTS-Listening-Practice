import React, { useState } from 'react';
import { X, BookOpen, Award, CheckCircle2 } from 'lucide-react';

interface BandDescriptorsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BandDescriptorsModal: React.FC<BandDescriptorsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'writing' | 'speaking'>('writing');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Official IELTS Assessment Criteria & Band Descriptors
              </h2>
              <p className="text-xs text-slate-500">
                Public assessment rubrics used by certified examiners for Writing & Speaking
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

        {/* Tab Switcher */}
        <div className="px-6 pt-4 border-b border-slate-200 flex gap-4">
          <button
            onClick={() => setActiveTab('writing')}
            className={`pb-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'writing'
                ? 'border-blue-700 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Writing Assessment Rubric (Task 1 & Task 2)
          </button>
          <button
            onClick={() => setActiveTab('speaking')}
            className={`pb-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'speaking'
                ? 'border-blue-700 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Speaking Assessment Rubric (Parts 1, 2 & 3)
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          {activeTab === 'writing' ? (
            <div className="space-y-6">
              {/* 4 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm">
                    1. Task Achievement / Task Response (25%)
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Evaluates how completely and relevantly the candidate responds to the prompt. In Task 1, requires a clear overall trend/overview and key feature data. In Task 2, demands a well-developed position throughout with nuanced arguments and supporting evidence.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm">
                    2. Coherence and Cohesion (25%)
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Examines the logical structure, paragraphing strategy, and flow of ideas. Assesses whether cohesive devices (connectors, pronouns, transition markers) are deployed naturally without mechanical overuse.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm">
                    3. Lexical Resource (25%)
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Assesses the breadth, precision, and stylistic sophistication of vocabulary. Focuses on uncommon lexical items, natural collocations, accurate word formation, and appropriate register without repetitive phrasing.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm">
                    4. Grammatical Range and Accuracy (25%)
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Focuses on the variety of complex sentence structures (conditionals, relative clauses, passive voice, inversions) combined with error-free sentences and flawless punctuation.
                  </p>
                </div>
              </div>

              {/* Band Levels */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                      <th className="p-3 w-16">Band</th>
                      <th className="p-3">Summary Descriptors</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3 font-bold font-mono text-emerald-700">9.0</td>
                      <td className="p-3">Full operational command; insightful, fully developed, seamless cohesion, sophisticated and natural vocabulary with rare slips.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold font-mono text-emerald-700">8.0</td>
                      <td className="p-3">Well-developed response; logical paragraphs, wide vocabulary with skillful collocations, wide range of complex structures with rare non-systematic errors.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold font-mono text-blue-700">7.0</td>
                      <td className="p-3">Addresses all parts of task; clear progression and central topic per paragraph, sufficient range of vocabulary with awareness of style, frequent error-free sentences.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold font-mono text-slate-700">6.0</td>
                      <td className="p-3">Addresses requirements; generally coherent with some mechanical linking, adequate vocabulary with occasional inaccuracies in word choice or grammar.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Speaking Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm">
                    1. Fluency and Coherence (25%)
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Measures continuous speech without hesitation, self-correction, or unnatural pauses to search for words. Evaluates topic development and natural discourse marker usage.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm">
                    2. Lexical Resource (25%)
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Evaluates the candidate's ability to express ideas precisely, paraphrase effortlessly, and employ natural idioms and phrasal verbs appropriately.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm">
                    3. Grammatical Range and Accuracy (25%)
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Focuses on the flexibility and complexity of grammatical constructions used naturally in spontaneous conversation without frequent grammatical breakdowns.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm">
                    4. Pronunciation (25%)
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Assesses phonological features: stress, rhythm, chunking, and intonation. Speech must be effortless to understand without listener strain.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
