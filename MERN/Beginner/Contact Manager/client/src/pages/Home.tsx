import { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import EditModal from "../components/ui/EditModal";
import DeleteModal from "../components/ui/DeleteModal";
import ContactView from "../components/ui/ContactView";
import { useContact } from "../context/ContactContext";
import { useUser } from "../context/UserContext";

type Contact = {
  _id: string;
  name: string;
  email: string;
  contactNumber: string;
};

const Home = () => {
  const { contacts } = useContact();
  const { user } = useUser();

  console.log(user);

  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewContact, setViewContact] = useState<boolean>(false);

  if (!user?._id) {
    return (
      <div className="flex items-center justify-center mt-10">
        <p className="text-center text-sm text-purple-600 tracking-wider">
          Please Login to create and views contacts
        </p>
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="flex items-center justify-center mt-10">
        <p className="text-center text-sm text-purple-600 tracking-wider">
          You don't have any contacts <br />
          Create some
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-10 p-4 w-3/4 mx-auto">
        <div className="overflow-x-auto rounded shadow-lg border border-gray-200 h-[600px] flex flex-col">
          {/* TABLE */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Sl No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Mobile No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {contacts.map((contact, index) => (
                <tr
                  key={contact._id}
                  className="hover:bg-gray-50 transition-all duration-150"
                >
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                    {contact.name}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    +91 {contact.contactNumber}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {contact.email}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 transition"
                        onClick={() => {
                          setViewContact(true);
                          setSelectedContact(contact);
                        }}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 transition"
                        onClick={() => {
                          setEditOpen(true);
                          setSelectedContact(contact);
                        }}
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition"
                        onClick={() => {
                          setDeleteId(contact._id);
                          setDeleteOpen(true);
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editOpen && (
        <EditModal
          contact={selectedContact}
          onClose={() => setEditOpen(false)}
        />
      )}

      {/* DELETE MODAL */}
      {deleteOpen && deleteId && (
        <DeleteModal id={deleteId} onClose={() => setDeleteOpen(false)} />
      )}

      {/* VIEW CONTACT MODAL */}
      {viewContact && (
        <ContactView
          contact={selectedContact}
          onClose={() => setViewContact(false)}
        />
      )}
    </>
  );
};

export default Home;
