import { useNotes } from "../../context/NoteContext";
import Container from "./Container";
import NoteCard from "./NoteCard";

const NoteList = () => {
  const { notes } = useNotes();

  if (notes.length === 0) {
    return (
      <div className="w-full flex items-center justify-center h-[calc(100vh-63px)]">
        No List yet
      </div>
    );
  }

  return (
    <Container>
      <div className="grid grid-cols-4 gap-5">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            heading={note.heading}
            description={note.description}
            date={note.createdAt}
            id={note.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default NoteList;
