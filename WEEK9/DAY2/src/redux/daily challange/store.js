// store.js
import { createStore } from "redux";

// Action Types
const ADD_TASK = "ADD_TASK";
const EDIT_TASK = "EDIT_TASK";
const DELETE_TASK = "DELETE_TASK";
const SET_DAY = "SET_DAY";

// Action Creators
export const addTask = (day, task) => ({ type: ADD_TASK, payload: { day, task } });
export const editTask = (day, taskId, updatedTask) => ({ type: EDIT_TASK, payload: { day, taskId, updatedTask } });
export const deleteTask = (day, taskId) => ({ type: DELETE_TASK, payload: { day, taskId } });
export const setDay = (day) => ({ type: SET_DAY, payload: day });

// Initial State
const initialState = {
  selectedDay: new Date().toISOString().split("T")[0], // default today
  tasksByDay: {}
};

// Reducer
function plannerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, selectedDay: action.payload };

    case ADD_TASK: {
      const { day, task } = action.payload;
      const tasks = state.tasksByDay[day] || [];
      return {
        ...state,
        tasksByDay: {
          ...state.tasksByDay,
          [day]: [...tasks, { id: Date.now(), ...task }]
        }
      };
    }

    case EDIT_TASK: {
      const { day, taskId, updatedTask } = action.payload;
      const tasks = state.tasksByDay[day] || [];
      return {
        ...state,
        tasksByDay: {
          ...state.tasksByDay,
          [day]: tasks.map(t => t.id === taskId ? { ...t, ...updatedTask } : t)
        }
      };
    }

    case DELETE_TASK: {
      const { day, taskId } = action.payload;
      const tasks = state.tasksByDay[day] || [];
      return {
        ...state,
        tasksByDay: {
          ...state.tasksByDay,
          [day]: tasks.filter(t => t.id !== taskId)
        }
      };
    }

    default:
      return state;
  }
}

export const store = createStore(plannerReducer);
