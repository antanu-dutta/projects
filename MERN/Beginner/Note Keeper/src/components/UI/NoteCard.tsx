import * as motion from "motion/react-client";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import UpdateNote from "../modals/UpdateNote";
import Delete from "../modals/Delete";

const NoteCard = (note: {
  heading: string;
  description: string;
  date: string;
  id: string;
}) => {
  const [update, setUpdate] = useState<boolean>(false);
  const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
        className="relative p-6 rounded-2xl from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 transition-all duration-300 max-w-md group overflow-hidden"
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 from-purple-500/0 to-pink-500/0 group-hover:from-primary-500/10 group-hover:to-pink-500/10 transition-all duration-300 rounded-2xl" />

        {/* Animated border glow */}
        <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-300" />

        {/* Top-right action buttons (Edit & Delete) */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <button
            onClick={() => setUpdate(true)}
            className="p-2 cursor-pointer rounded-full bg-white/10 hover:bg-purple-600/30 backdrop-blur-md text-purple-300 hover:text-white transition-all duration-200"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => setDeleteConfirm(true)}
            className="p-2 cursor-pointer rounded-full bg-white/10 hover:bg-red-600/30 backdrop-blur-md text-red-300 hover:text-white transition-all duration-200"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {/* Card Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-8 bg-purple-500 rounded-full" />
            <h2 className="text-xl font-bold text-white">{note.heading}</h2>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed mb-6">
            {note.description}
          </p>

          <div className="flex items-center gap-2 text-xs text-purple-300">
            <span className="text-base">🕒</span>
            <span>Created At: {note.date}</span>
          </div>
        </div>
      </motion.div>

      {update && (
        <UpdateNote noteId={note.id} onClose={() => setUpdate(false)} />
      )}

      {deleteConfirm && (
        <Delete noteId={note.id} onClose={() => setDeleteConfirm(false)} />
      )}
    </>
  );
};

export default NoteCard;
