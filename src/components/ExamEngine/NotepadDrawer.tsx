import React from 'react';
import { X, Trash2, StickyNote } from 'lucide-react';

interface NotepadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notes: string;
  onChangeNotes: (notes: string) => void;
  contrastTheme?: 'light' | 'dark' | 'yellow-black';
}

export const NotepadDrawer: React.FC<NotepadDrawerProps> = ({
  isOpen,
  onClose,
  notes,
  onChangeNotes,
  contrastTheme = 'light',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-14 right-4 z-50 w-80 sm:w-96 rounded-xl shadow-xl border overflow-hidden transition-all bg-amber-50/95 backdrop-blur-md border-amber-300 text-slate-900">
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-amber-100/90 border-b border-amber-200">
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
          <StickyNote className="w-4 h-4 text-amber-700" />
          <span>Candidate Digital Scratchpad</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onChangeNotes('')}
            title="Clear notes"
            className="p-1 text-amber-800 hover:text-red-700 rounded transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            title="Close scratchpad"
            className="p-1 text-amber-800 hover:text-slate-900 rounded transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="p-3">
        <textarea
          value={notes}
          onChange={(e) => onChangeNotes(e.target.value)}
          placeholder="Jot down keywords, paragraph notes, or brainstorm essay points here... (Notes are saved automatically)"
          className="w-full h-44 text-xs font-mono bg-transparent border-0 resize-none focus:outline-none placeholder:text-amber-800/50 text-slate-900 leading-relaxed"
        />
        <div className="flex justify-between items-center text-[10px] text-amber-800/70 pt-1 border-t border-amber-200/60">
          <span>Official CD IELTS feature</span>
          <span>{notes.length} characters</span>
        </div>
      </div>
    </div>
  );
};
