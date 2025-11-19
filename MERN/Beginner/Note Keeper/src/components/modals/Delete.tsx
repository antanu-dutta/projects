import { motion } from "motion/react";
import { useNotes } from "../../context/NoteContext";

type PropsType = {
  noteId: string;
  onClose: () => void;
};

const Delete = ({ noteId, onClose }: PropsType) => {
  const { handleDeleteNote } = useNotes();

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/70 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        exit={{ scale: 0 }}
        className="bg-white p-4 rounded-md"
      >
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this note
        </p>
        <div className="flex items-center justify-end gap-4">
          <button
            className="px-5 py-2 bg-yellow-500 hover:bg-yellow-600 transition rounded-md cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            onClick={() => handleDeleteNote(noteId)}
            className="px-5 py-2 bg-red-500 hover:bg-red-600 transition rounded-md cursor-pointer"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Delete;
