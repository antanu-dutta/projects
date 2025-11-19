import React from "react";

const Form = ({ todoInput, setTodoInput, handleFormSubmit }) => {
  return (
    <form
      className="bg-white shadow-md p-4 border border-gray-400 rounded-md w-[400px]"
      onSubmit={handleFormSubmit}
    >
      <h1 className="text-center text-2xl uppercase mb-10">Todo Form</h1>
      <div className="flex items-start flex-col gap-1.5 group">
        <label
          htmlFor="task"
          className="text-sm text-gray-500 tracking-wide group-focus-within:text-purple-600"
        >
          Task name
        </label>
        <input
          type="text"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          id="task"
          className="border border-gray-600 text-sm outline-none px-3 py-1 rounded transition-all ease-in-out focus-within:border-purple-500 w-full"
        />
      </div>
      <button
        type="submit"
        className="text-center w-full bg-purple-700 text-white py-2 rounded mt-5 cursor-pointer transition-all hover:bg-purple-600 ease-in-out"
      >
        Add
      </button>
    </form>
  );
};

export default Form;
