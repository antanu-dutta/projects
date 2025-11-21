import { Mail, Phone, Calendar, X, User } from "lucide-react";

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

const ContactView = ({ contact, onClose }: ContactProps) => {
  if (!contact) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-xl shadow-xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        >
          <X size={20} />
        </button>

        {/* Profile Section */}
        <div className="flex flex-col items-center gap-3 pb-4 border-b">
          <div className="w-20 h-20 rounded-full bg-purple-200 flex items-center justify-center shadow-md">
            <User size={40} className="text-purple-600" />
          </div>
          <p className="text-gray-800 text-lg font-semibold tracking-wide">
            {contact.name}
          </p>
        </div>

        {/* Info Section */}
        <div className="mt-5 space-y-4">
          {/* Mobile */}
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border">
            <Phone size={20} className="text-purple-600" />
            <div>
              <p className="text-xs text-gray-500">Mobile No.</p>
              <p className="text-gray-800 font-medium">
                +91 {contact.contactNumber}
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border">
            <Mail size={20} className="text-purple-600" />
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-gray-800 font-medium">{contact.email}</p>
            </div>
          </div>

          {/* Dummy Created At (replace when you add backend) */}
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border">
            <Calendar size={20} className="text-purple-600" />
            <div>
              <p className="text-xs text-gray-500">Created At</p>
              <p className="text-gray-800 font-medium">25 Dec 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactView;
