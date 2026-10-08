import React, { StrictMode, createContext, useContext, useReducer, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const TaskContext = createContext(null);

const initialState = {
  tasks: [
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Learn useContext", completed: true },
    { id: 3, text: "Learn useReducer", completed: false },
  ],
  filter: "ALL",
};

function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, { id: Date.now(), text: action.payload, completed: false }],
      };
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        ),
      };
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, text: action.payload.text } : task
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "FILTER_TASKS":
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return <TaskContext.Provider value={{ state, dispatch }}>{children}</TaskContext.Provider>;
}

function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used inside TaskProvider");
  }

  return context;
}

function TaskManager() {
  const { state, dispatch } = useTasks();
  const inputRef = useRef(null);
  const editInputRef = useRef(null);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const filteredTasks = state.tasks.filter((task) => {
    if (state.filter === "COMPLETED") return task.completed;
    if (state.filter === "ACTIVE") return !task.completed;
    return true;
  });

  function handleAddTask(event) {
    event.preventDefault();
    const taskText = inputRef.current?.value.trim();

    if (!taskText) return;

    dispatch({ type: "ADD_TASK", payload: taskText });
    inputRef.current.value = "";
  }

  function handleEditStart(task) {
    setEditingId(task.id);
    setEditingText(task.text);

    setTimeout(() => {
      if (editInputRef.current) {
        editInputRef.current.focus();
        editInputRef.current.select();
      }
    }, 0);
  }

  function saveEdit(taskId) {
    const value = editingText.trim();

    if (!value) return;

    dispatch({ type: "EDIT_TASK", payload: { id: taskId, text: value } });
    setEditingId(null);
    setEditingText("");
  }

  return (
    <main className="task-app">
      <section className="task-card">
        <h1>Task Manager</h1>

        <form className="task-form" onSubmit={handleAddTask}>
          <input ref={inputRef} type="text" placeholder="Add a new task" aria-label="Add a new task" />
          <button type="submit">Add</button>
        </form>

        <div className="filters" aria-label="Task filter controls">
          {[
            { label: "All", value: "ALL" },
            { label: "Active", value: "ACTIVE" },
            { label: "Completed", value: "COMPLETED" },
          ].map((filter) => (
            <button
              key={filter.value}
              type="button"
              className={state.filter === filter.value ? "filter-btn active" : "filter-btn"}
              onClick={() => dispatch({ type: "FILTER_TASKS", payload: filter.value })}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <ul className="task-list">
          {filteredTasks.map((task) => (
            <li key={task.id} className={task.completed ? "task completed" : "task"}>
              {editingId === task.id ? (
                <div className="edit-row">
                  <input
                    ref={editInputRef}
                    type="text"
                    value={editingText}
                    onChange={(event) => setEditingText(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") saveEdit(task.id);
                      if (event.key === "Escape") {
                        setEditingId(null);
                        setEditingText("");
                      }
                    }}
                    aria-label={`Edit task ${task.text}`}
                  />
                  <button type="button" onClick={() => saveEdit(task.id)}>Save</button>
                </div>
              ) : (
                <>
                  <label className="task-check">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => dispatch({ type: "TOGGLE_TASK", payload: task.id })}
                    />
                    <span>{task.text}</span>
                  </label>

                  <div className="task-actions">
                    <button type="button" onClick={() => handleEditStart(task)}>
                      Edit
                    </button>
                    <button type="button" className="delete-btn" onClick={() => dispatch({ type: "DELETE_TASK", payload: task.id })}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function App() {
  return (
    <TaskProvider>
      <TaskManager />
    </TaskProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
