// TaskList.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "./store";

function TaskList({ onEdit }) {
  const dispatch = useDispatch();
  const { selectedDay, tasksByDay } = useSelector(state => state);
  const tasks = tasksByDay[selectedDay] || [];

  return (
    <div>
      <h3>Tasks for {selectedDay}</h3>
      {tasks.map(task => (
        <div key={task.id}>
          <span>{task.title}</span>
          <button onClick={() => onEdit(task)}>Edit</button>
          <button onClick={() => dispatch(deleteTask(selectedDay, task.id))}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
