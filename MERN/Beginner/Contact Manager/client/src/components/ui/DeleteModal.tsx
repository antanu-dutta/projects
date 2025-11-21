import { AlertTriangle, X } from "lucide-react";

type DeleteModalProps = {
  id: string;
  onClose: () => void;
};

const DeleteModal = ({ id, onClose }: DeleteModalProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/50  flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-xl shadow-lg p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Icon + Title */}
        <div className="flex flex-col items-center">
          <AlertTriangle size={48} className="text-red-500 mb-3" />
          <h2 className="text-xl font-semibold text-gray-800 text-center">
            Are you sure?
          </h2>
          <p className="text-gray-600 text-center mt-2">
            Do you really want to delete this contact? This action cannot be
            undone.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
          >
            Cancel
          </button>

          <button className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
