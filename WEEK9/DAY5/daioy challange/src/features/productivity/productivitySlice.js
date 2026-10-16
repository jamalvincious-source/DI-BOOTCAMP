import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  categories: [
    { id: "work", name: "Work", color: "sage" },
    { id: "personal", name: "Personal", color: "clay" },
    { id: "wellbeing", name: "Wellbeing", color: "lavender" },
  ],
  tasks: [
    { id: "task-1", title: "Plan the week ahead", categoryId: "work", completed: true },
    { id: "task-2", title: "Finish project proposal", categoryId: "work", completed: false },
    { id: "task-3", title: "Reply to important emails", categoryId: "work", completed: false },
    { id: "task-4", title: "Pick up groceries", categoryId: "personal", completed: false },
    { id: "task-5", title: "Call a friend", categoryId: "personal", completed: true },
    { id: "task-6", title: "Take an evening walk", categoryId: "wellbeing", completed: false },
  ],
};

const productivitySlice = createSlice({
  name: "productivity",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.tasks.push(action.payload);
      },
      prepare({ title, categoryId }) {
        return {
          payload: {
            id: nanoid(),
            title: title.trim(),
            categoryId,
            completed: false,
          },
        };
      },
    },
    editTask(state, action) {
      const task = state.tasks.find((item) => item.id === action.payload.id);
      if (task) {
        task.title = action.payload.title.trim();
        task.categoryId = action.payload.categoryId;
      }
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleTaskProgress(state, action) {
      const task = state.tasks.find((item) => item.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    addCategory: {
      reducer(state, action) {
        state.categories.push(action.payload);
      },
      prepare(name) {
        return {
          payload: {
            id: nanoid(),
            name: name.trim(),
            color: ["sage", "clay", "lavender", "sky", "gold"][name.trim().length % 5],
          },
        };
      },
    },
    editCategory(state, action) {
      const category = state.categories.find((item) => item.id === action.payload.id);
      if (category) category.name = action.payload.name.trim();
    },
    deleteCategory(state, action) {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload,
      );
      state.tasks = state.tasks.filter((task) => task.categoryId !== action.payload);
    },
  },
});

export const {
  addCategory,
  addTask,
  deleteCategory,
  deleteTask,
  editCategory,
  editTask,
  toggleTaskProgress,
} = productivitySlice.actions;

export default productivitySlice.reducer;
