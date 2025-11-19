import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Note = {
  id: string;
  heading: string;
  description: string;
  createdAt: string;
};

type NewNoteInput = {
  heading: string;
  description: string;
};

type NoteContextType = {
  notes: Note[];
  handleAddNote: (note: NewNoteInput) => void;
  handleUpdateNote: (updatedNote: {
    id: string;
    heading: string;
    description: string;
  }) => void;
  handleDeleteNote: (id: string) => void;
};

type PropTypes = {
  children: ReactNode;
};

const NoteContext = createContext<NoteContextType | null>(null);

const NoteProvider = ({ children }: PropTypes) => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  const handleAddNote = ({ heading, description }: NewNoteInput) => {
    const newNote: Note = {
      id: Date.now().toString(),
      heading,
      description,
      createdAt: new Date().toLocaleDateString(),
    };

    setNotes((prev) => [...prev, newNote]);
  };

  const handleUpdateNote = (updatedNote: {
    id: string;
    heading: string;
    description: string;
  }) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === updatedNote.id ? { ...note, ...updatedNote } : note
      )
    );
  };

  const handleDeleteNote = (id: string) => {
    const filtedNote = notes.filter((item) => item.id !== id);
    setNotes(filtedNote);
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <NoteContext.Provider
      value={{ notes, handleAddNote, handleUpdateNote, handleDeleteNote }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;

export const useNotes = () => {
  const consumer = useContext(NoteContext);
  if (!consumer) throw new Error("Wrap you app component into Provide");
  return consumer;
};
