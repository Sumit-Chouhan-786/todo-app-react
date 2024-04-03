import React, { useState } from "react"; // Importing React and useState hook from react package
import TodoListItem from "./TaskList"; // Importing TodoListItem component from TodoListItem.js file

// Defining TodoList functional component
const TodoList = () => {
  // Initializing state variables using useState hook
  const [inputValue, setInputValue] = useState(""); // State variable to store input value
  const [error, setError] = useState(""); // State variable to store error message
  const [todos, setTodos] = useState([]); // State variable to store list of todos

  // Function to add a new todo
  const setData = () => {
    // Checking if input value is empty
    if (inputValue.trim() === "") {
      setError("Input value cannot be empty."); // Setting error message if input is empty
    } else {
      // Adding new todo to todos state array
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: Date.now(), title: inputValue, isCompleted: false },
      ]);
      setInputValue(""); // Clearing input field after adding todo
      setError(""); // Clearing error message
    }
  };

  // Function to delete a todo
  const handleDeleteTodo = (id) => {
    // Filtering out todo with specified id from todos state array
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Function to toggle completion status of a todo
  const handleCompleteTodo = (id) => {
    // Updating completion status of todo with specified id
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  // Function to edit the title of a todo
  const handleEditTodo = (id, newTitle) => {
    // Updating title of todo with specified id
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  };

  // Rendering TodoList component
  return (
    <div className="flex h-screen justify-center items-center">
      {" "}
      {/* Container div */}
      <div className="px-6 pt-6 pb-5 border border-gray-300 rounded-lg w-full mx-3 sm:w-[480px]">
        {" "}
        {/* Todo list container */}
        <h2 className="font-semibold text-2xl text-center pb-7">Todos</h2>{" "}
        {/* Heading */}
        <p className="font-medium text-xs text-gray-600 pb-2">
          Enter Todo
        </p>{" "}
        {/* Instruction for entering todo */}
        {/* Input field for entering todo */}
        <div className="flex justify-between items-center ps-6 py-1 pe-1 border hover:border-blue-500 border-gray-300 transition-all rounded-lg mb-2 relative">
          {error && ( // Display error message if there is any
            <p className="text-red-500 font-semibold text-sm absolute right-0 top-[110%]">
              {error}
            </p>
          )}
          <input
            value={inputValue} // Binding input value to inputValue state variable
            onChange={(e) => {
              setInputValue(e.target.value); // Updating inputValue state variable when input changes
              setError(""); // Clearing error message when input changes
            }}
            className="outline-none w-full pr-2 text-gray-600" // Input field styling
            type="text"
            placeholder="Enter Todo Here" // Placeholder text for input field
          />
          <button
            onClick={setData} // Event handler to add todo
            className="bg-blue-600 hover:bg-red-500 transition-all text-white font-semibold text-sm px-6 py-3 rounded-lg" // Button styling
          >
            Add
          </button>
        </div>
        {/* Container for displaying todos */}
        <div className="overflow-hidden">
          {/* Mapping over todos array and rendering TodoListItem component for each todo */}
          {todos.map((todo) => (
            <TodoListItem
              key={todo.id} // Unique key for each todo item
              todo={todo} // Passing todo object as prop
              onDelete={handleDeleteTodo} // Event handler to delete todo
              onComplete={handleCompleteTodo} // Event handler to toggle completion status
              onEdit={handleEditTodo} // Event handler to edit todo
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList; // Exporting TodoList component
