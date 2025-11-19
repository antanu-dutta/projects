import { useEffect, useState } from "react";
import Form from "./components/form/Form";
import List from "./components/lists/List";

const App = () => {
  // Initialize from localStorage directly
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  // Handle new todo
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (todoInput.trim() === "") {
      return alert("Please enter a todo");
    }

    setTodos((prev) => [...prev, { id: prev.length + 1, todo: todoInput }]);
    setTodoInput("");
  };

  // Toggle theme and save to localStorage
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Apply theme on initial load
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Save todos
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="w-full h-full bg-white flex items-center flex-col justify-center gap-4 dark:bg-gray-400">
      <div className="flex items-center justify-center flex-col gap-4">
        <h3>Switch to {theme === "dark" ? "light" : "dark"} mode</h3>
        <div
          className="rounded-full w-[100px] h-[50px] border-purple-600 p-2 border mb-10 cursor-pointer"
          onClick={toggleTheme}
        >
          <div
            className={`bg-purple-500 rounded-full w-10 h-10 relative -top-1 transition-all ${
              theme === "dark" ? "left-11" : "-left-[3px]"
            }`}
          ></div>
        </div>
      </div>

      <Form
        todoInput={todoInput}
        setTodoInput={setTodoInput}
        handleFormSubmit={handleFormSubmit}
      />
      <List todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
