import React, { useState } from "react";
import {
  TrashIcon,
  CheckCircleIcon,
  PencilIcon,
} from "@heroicons/react/24/solid"; // Importing necessary icons from Heroicons
import { Update } from "./Icon"; // Importing custom Update icon from Icon.js

// TodoListItem functional component
const TodoListItem = ({ todo, onDelete, onComplete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false); // State variable to track editing mode
  const [newTitle, setNewTitle] = useState(todo.title); // State variable to store new title during editing

  // Function to handle delete todo action
  const handleDelete = () => {
    onDelete(todo.id); // Call onDelete function with todo id
  };

  // Function to handle complete todo action
  const handleComplete = () => {
    onComplete(todo.id); // Call onComplete function with todo id
  };
  // Function to handle edit todo action
  const handleEdit = () => {
    if (isEditing && newTitle.trim() !== "") {
      // If in editing mode and new title is not empty
      onEdit(todo.id, newTitle); // Call onEdit function with todo id and new title
    }
    setIsEditing(!isEditing); // Toggle editing mode
  };
  // Rendering TodoListItem component
  return (
    <div className="flex justify-between items-center transition-all px-4  py-[10px] border_remove">
      {isEditing ? ( // If in editing mode
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="text-gray-600 text-sm w-full me-2 border border-black rounded-md p-1"
        />
      ) : (
        <p
          className={`text-gray-600 text-sm ${
            todo.isCompleted ? "line-through" : ""
          }`}
        >
          {todo.title}
        </p>
      )}
      <div className="flex gap-3">
        {/* Button for editing todo */}
        <button
          onClick={handleEdit}
          className="text-gray-600 hover:text-blue-500 duration-300 transition-all"
        >
          {isEditing ? ( // If in editing mode, display Update icon
            <Update title="update done" height={24} width={24} />
          ) : (
            // Otherwise, display Pencil icon
            <PencilIcon title="update" height={24} width={24} />
          )}
        </button>
        {/* Button for deleting todo */}
        <button
          onClick={handleDelete}
          className="text-gray-600 hover:text-red-500 duration-300 transition-all"
        >
          <TrashIcon title="remove" height={24} width={24} />
        </button>
        {/* Button for completing todo */}
        <button
          onClick={handleComplete}
          className={`text-gray-600 hover:opacity-70 transition-all ${
            todo.isCompleted ? "text-green-500" : ""
          }`}
        >
          <CheckCircleIcon title="complete" height={24} width={24} />
        </button>
      </div>
    </div>
  );
};

export default TodoListItem; // Exporting TodoListItem component
