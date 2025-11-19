import { X } from "lucide-react";
import * as motion from "motion/react-client";
import { useState } from "react";
import { useNotes } from "../../context/NoteContext";

type PropsType = {
  noteId: string;
  onClose: () => void;
};

const UpdateNote = ({ noteId, onClose }: PropsType) => {
  const { notes, handleUpdateNote } = useNotes();
  const existingNote = notes.find((n) => n.id === noteId);

  const [heading, setHeading] = useState<string>(existingNote?.heading || "");
  const [description, setDescription] = useState<string>(
    existingNote?.description || ""
  );

  const handleUpdate = () => {
    if (!heading.trim() || !description.trim()) return;
    handleUpdateNote({ id: noteId, heading, description });
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/70 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        exit={{ scale: 0 }}
        className="bg-white overflow-hidden p-4 rounded text-black w-[400px]"
      >
        <div className="flex items-center justify-between mb-10">
          <div></div>
          <h2 className="text-center">Update Note</h2>
          <div onClick={onClose} className="cursor-pointer">
            <X size={17} />
          </div>
        </div>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="block text-gray-500" htmlFor="heading">
              Heading
            </label>
            <input
              id="heading"
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              placeholder="Note heading"
              className="w-full border outline-none border-gray-600 px-3 py-2 placeholder:text-sm rounded-md"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-gray-500" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border outline-none border-gray-600 px-3 py-2 placeholder:text-sm rounded-md"
              placeholder="Note description"
            ></textarea>
          </div>

          <motion.button
            whileTap={{ scale: 1.1 }}
            onClick={handleUpdate}
            className="rounded-full w-full text-gray-800 bg-primary px-8 py-2 text-sm cursor-pointer duration-200 hover:bg-primary/70"
          >
            Update
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default UpdateNote;
