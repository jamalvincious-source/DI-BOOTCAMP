// TaskForm.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "./store";

function TaskForm({ editingTask, setEditingTask }) {
  const dispatch = useDispatch();
  const selectedDay = useSelector(state => state.selectedDay);
  const [title, setTitle] = useState(editingTask ? editingTask.title : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      dispatch(editTask(selectedDay, editingTask.id, { title }));
      setEditingTask(null);
    } else {
      dispatch(addTask(selectedDay, { title }));
    }
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button type="submit">{editingTask ? "Update Task" : "Add Task"}</button>
    </form>
  );
}

export default TaskForm;
