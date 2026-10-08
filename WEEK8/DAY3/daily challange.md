#### Daily Challenge: Enhanced Task Manager

**Last Updated: October 10th, 2025**

---
**Objective:** Enhance the Task Manager application by adding new features, including the ability to edit tasks and filter tasks by completion status, using `useContext`, `useReducer`, and `useRef`.

#### Instructions

1. Set up a new React project using `create-react-app` or your preferred method.
2. Extend the existing Task Manager application (from the previous exercise) by adding these features:
3. **Edit Tasks:** Allow users to edit existing tasks by clicking on them.
4. **Filter Tasks:** Implement buttons to filter tasks by completion status (e.g., show all, show completed, show active).
5. Use `useRef` to enable task editing and update the task text when the user makes changes.
6. Implement actions in the reducer for editing tasks and filtering tasks.

#### Hints

- To enable task editing, you can add an “Edit” button next to each task that, when clicked, activates an input field for editing the task text.
- Use a state variable or a ref to track the edited task text before saving.
- Implement actions like `EDIT_TASK` and `FILTER_TASKS` in the reducer to handle task editing and filtering.
- Use conditional rendering to display tasks based on the selected filter.

---

### Task state and reducer example

Use this context and reducer as the shared task state for the application:

```jsx
import React, {
  createContext,
  useContext,
  useReducer
} from "react";

const TaskContext = createContext();

const initialState = {
  tasks: [
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Learn useContext", completed: true },
    { id: 3, text: "Learn useReducer", completed: false }
  ],
  filter: "ALL"
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: Date.now(),
            text: action.payload,
            completed: false
          }
        ]
      };

    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        )
      };

    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, text: action.payload.text }
            : task
        )
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter(
          (task) => task.id !== action.payload
        )
      };

    case "FILTER_TASKS":
      return {
        ...state,
        filter: action.payload
      };

    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
```

### Submit your Daily Challenge:
