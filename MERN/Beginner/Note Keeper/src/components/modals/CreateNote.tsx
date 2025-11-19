import { X } from "lucide-react";
import * as motion from "motion/react-client";
import { useState } from "react";
import { useNotes } from "../../context/NoteContext";

type PropsType = {
  onClose: () => void;
};

const CreateNote = ({ onClose }: PropsType) => {
  const [heading, setHeading] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { handleAddNote } = useNotes();

  const handleCreateNote = () => {
    handleAddNote({ heading, description });
    console.log({ heading, description });
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
          <h2 className="text-center ">Create new note</h2>
          <div onClick={() => onClose()}>
            <X size={17} />
          </div>
        </div>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="block text-gray-500" htmlFor="heading">
              Heading
            </label>
            <input
              className="w-full border outline-none border-gray-600 px-3 py-2  placeholder:text-sm rounded-md"
              type="text"
              id="heading"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              placeholder="Note heading"
            />
          </div>
          <div>
            <label className="block text-gray-500" htmlFor="descritpion">
              Description
            </label>

            <textarea
              name=""
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border outline-none border-gray-600 px-3 py-2  placeholder:text-sm rounded-md"
              id=""
            ></textarea>
          </div>
          <motion.button
            whileTap={{ scale: 1.1 }}
            onClick={handleCreateNote}
            className="rounded-full w-full text-gray-800 bg-primary px-8 py-2 text-sm cursor-pointer duration-200 hover:bg-primary/70"
          >
            Create
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateNote;
