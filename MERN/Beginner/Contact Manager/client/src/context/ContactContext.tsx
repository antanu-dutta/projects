import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";

type Contacts = {
  _id: string;
  name: string;
  contactNumber: string;
  email: string;
  avatar: string;
};

type ContactContextType = {
  contacts: Contacts[];
  fetchContacts: () => Promise<void>;
};

type Props = {
  children: React.ReactNode;
};

const ContactContext = createContext<ContactContextType | null>(null);

const ContactContextProvider = ({ children }: Props) => {
  const [contacts, setContacts] = useState<Contacts[]>([]);
  const { user } = useUser();

  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/contacts", {
        withCredentials: true,
      });
      console.log(res);
      setContacts(res.data.contacts);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [user]);

  return (
    <ContactContext.Provider value={{ contacts, fetchContacts }}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = () => {
  const context = useContext(ContactContext);

  if (!context) {
    throw new Error("useContact must be used inside ContactContextProvider");
  }

  return context;
};

export default ContactContextProvider;
