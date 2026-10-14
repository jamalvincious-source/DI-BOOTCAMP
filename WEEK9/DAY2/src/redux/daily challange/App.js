// App.js
import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import DatePicker from "./DatePicker";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

function App() {
  const [editingTask, setEditingTask] = useState(null);

  return (
    <Provider store={store}>
      <div>
        <h1>Daily Planner</h1>
        <DatePicker />
        <TaskForm editingTask={editingTask} setEditingTask={setEditingTask} />
        <TaskList onEdit={setEditingTask} />
      </div>
    </Provider>
  );
}

export default App;
