import { useState } from "react";
import { X } from "lucide-react";

type Contact = {
  _id: string;
  name: string;
  email: string;
  contactNumber: string;
};

type ContactProps = {
  contact: Contact | null;
  onClose: () => void;
};

const EditModal = ({ contact, onClose }: ContactProps) => {
  const [formData, setFormData] = useState({
    name: contact?.name,
    email: contact?.email,
    contactNumber: contact?.contactNumber,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/50  flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-xl shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-5">
          Edit Contact
        </h2>

        {/* FORM */}
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Mobile Number</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            Cancel
          </button>

          <button className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 text-white">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
