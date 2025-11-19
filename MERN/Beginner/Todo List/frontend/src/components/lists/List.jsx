import React from "react";
import { FilePenLine, Trash } from "lucide-react";

const List = ({ todos }) => {
  return (
    <div className="border border-gray-400 p-4 rounded-md w-[400px] h-[400px]">
      <h4 className="text-xl mb-7 text-center">Your todos</h4>
      <ul className="overflow-auto h-full space-y-2">
        {todos.map((t) => {
          return (
            <li
              key={t.id}
              className="flex items-center justify-between border-s-2 group shadow py-2 px-2 border-purple-500 rounded-md"
            >
              <span className="text-sm group-hover:translate-x-1.5 transition-all duration-200 ease-in-out">
                {t.todo}
              </span>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-600 text-white rounded-full hover:bg-red-500 transition-all ease-in-out cursor-pointer">
                  <Trash size={16} />
                </div>
                <div className="p-2 bg-yellow-600 text-white rounded-full hover:bg-yellow-500 transition-all ease-in-out cursor-pointer">
                  <FilePenLine size={16} />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
