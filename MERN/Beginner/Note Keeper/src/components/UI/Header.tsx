import { Search } from "lucide-react";
import Container from "./Container";
import { useState } from "react";
import CreateNote from "../modals/CreateNote";
import { AnimatePresence } from "motion/react";

const Header = () => {
  const [createNote, setCreateNote] = useState<boolean>(false);
  return (
    <>
      <header className="border-b border-gray-500 rounded-full">
        <Container>
          <div className="flex items-center justify-between">
            <h2 className="text-white">Notes Kepper</h2>
            <div className="border border-gray-600 rounded-full p-2 flex items-center gap-3 w-[400px]">
              <Search size={17} />
              <input
                type="text"
                className="outline-none border-none w-full text-sm "
                placeholder="Search your notes"
              />
            </div>
            {/* <button className="rounded-full text-gray-800 bg-primary px-8 py-2 text-sm cursor-pointer duration-200 hover:bg-primary/70">
            Login
          </button> */}

            <button
              className="rounded-full text-gray-800 bg-primary px-8 py-2 text-sm cursor-pointer duration-200 hover:bg-primary/70"
              onClick={() => setCreateNote(true)}
            >
              Create
            </button>
          </div>
        </Container>
      </header>
      <AnimatePresence>
        {createNote ? (
          <CreateNote onClose={() => setCreateNote(false)} />
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default Header;
