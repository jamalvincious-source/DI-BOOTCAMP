import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  addTask,
  deleteCategory,
  deleteTask,
  editCategory,
  editTask,
  toggleTaskProgress,
} from "./features/productivity/productivitySlice.js";
import {
  selectAllTasks,
  selectCategories,
  selectCategoryById,
  selectCompletedTasks,
  selectTasksByCategory,
} from "./features/productivity/productivitySelectors.js";

function CategorySelector({ selectedCategoryId, onSelect }) {
  const categories = useSelector(selectCategories);
  const allTasks = useSelector(selectAllTasks);
  const totalTasks = allTasks.length;
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const dispatch = useDispatch();

  function handleAddCategory(event) {
    event.preventDefault();
    if (!newCategoryName.trim()) return;
    dispatch(addCategory(newCategoryName));
    setNewCategoryName("");
  }

  function startEditing(category) {
    setEditingCategoryId(category.id);
    setEditingName(category.name);
  }

  function handleEditCategory(event, categoryId) {
    event.preventDefault();
    if (!editingName.trim()) return;
    dispatch(editCategory({ id: categoryId, name: editingName }));
    setEditingCategoryId(null);
    setEditingName("");
  }

  function handleDeleteCategory(categoryId) {
    dispatch(deleteCategory(categoryId));
    if (selectedCategoryId === categoryId) onSelect("all");
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-label">YOUR CATEGORIES</div>
      <nav className="category-list" aria-label="Task categories">
        <button
          className={`category-button${selectedCategoryId === "all" ? " selected" : ""}`}
          onClick={() => onSelect("all")}
          type="button"
        >
          <span className="category-dot all-dot" />
          <span>All tasks</span>
          <span className="category-count">{totalTasks}</span>
        </button>
        {categories.map((category) => (
          <div className="category-row" key={category.id}>
            {editingCategoryId === category.id ? (
              <form
                className="category-edit-form"
                onSubmit={(event) => handleEditCategory(event, category.id)}
              >
                <input
                  aria-label="Edit category name"
                  autoFocus
                  maxLength={30}
                  onChange={(event) => setEditingName(event.target.value)}
                  value={editingName}
                />
                <button aria-label="Save category name" type="submit">✓</button>
                <button
                  aria-label="Cancel category edit"
                  onClick={() => setEditingCategoryId(null)}
                  type="button"
                >×</button>
              </form>
            ) : (
              <>
                <button
                  className={`category-button${selectedCategoryId === category.id ? " selected" : ""}`}
                  onClick={() => onSelect(category.id)}
                  type="button"
                >
                  <span className={`category-dot dot-${category.color}`} />
                  <span className="category-name">{category.name}</span>
                  <span className="category-count">
                    {allTasks.filter((task) => task.categoryId === category.id).length}
                  </span>
                </button>
                <div className="category-actions">
                  <button
                    aria-label={`Rename ${category.name}`}
                    onClick={() => startEditing(category)}
                    type="button"
                  >✎</button>
                  <button
                    aria-label={`Delete ${category.name}`}
                    onClick={() => handleDeleteCategory(category.id)}
                    type="button"
                  >×</button>
                </div>
              </>
            )}
          </div>
        ))}
      </nav>

      <form className="add-category-form" onSubmit={handleAddCategory}>
        <input
          aria-label="New category name"
          maxLength={30}
          onChange={(event) => setNewCategoryName(event.target.value)}
          placeholder="New category…"
          value={newCategoryName}
        />
        <button aria-label="Add category" disabled={!newCategoryName.trim()} type="submit">+</button>
      </form>
      <p className="sidebar-hint">Deleting a category also removes its tasks.</p>
    </aside>
  );
}

function TaskList({ categoryId, onEditTask }) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => selectTasksByCategory(state, categoryId));
  const categories = useSelector(selectCategories);
  const categoryById = useCallback(
    (id) => categories.find((category) => category.id === id),
    [categories],
  );
  const handleToggle = useCallback(
    (taskId) => dispatch(toggleTaskProgress(taskId)),
    [dispatch],
  );
  const handleDelete = useCallback(
    (taskId) => dispatch(deleteTask(taskId)),
    [dispatch],
  );

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">✳</span>
        <h3>Nothing on this list yet</h3>
        <p>Add a task to make a little progress today.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => {
        const category = categoryById(task.categoryId);
        return (
          <article className={`task-item${task.completed ? " completed" : ""}`} key={task.id}>
            <button
              aria-label={`${task.completed ? "Mark incomplete" : "Mark complete"}: ${task.title}`}
              aria-pressed={task.completed}
              className="task-check"
              onClick={() => handleToggle(task.id)}
              type="button"
            >
              {task.completed && <span aria-hidden="true">✓</span>}
            </button>
            <div className="task-copy">
              <h3>{task.title}</h3>
              <span className={`task-tag tag-${category?.color ?? "sage"}`}>
                {category?.name ?? "Uncategorized"}
              </span>
            </div>
            <div className="task-actions">
              <button aria-label={`Edit ${task.title}`} onClick={() => onEditTask(task)} type="button">Edit</button>
              <button aria-label={`Delete ${task.title}`} onClick={() => handleDelete(task.id)} type="button">×</button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function TaskForm({ categories, task, onSave, onCancel }) {
  const [title, setTitle] = useState(task?.title ?? "");
  const [categoryId, setCategoryId] = useState(task?.categoryId ?? categories[0]?.id ?? "");

  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim() || !categoryId) return;
    onSave({ title, categoryId });
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label>
        <span>TASK NAME</span>
        <input
          autoFocus
          maxLength={100}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="What would you like to get done?"
          value={title}
        />
      </label>
      <label>
        <span>CATEGORY</span>
        <select onChange={(event) => setCategoryId(event.target.value)} value={categoryId}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </label>
      <div className="form-actions">
        <button className="secondary-button" onClick={onCancel} type="button">Cancel</button>
        <button className="primary-button" disabled={!title.trim() || !categoryId} type="submit">
          {task ? "Save changes" : "Add task"}
        </button>
      </div>
    </form>
  );
}

export default function App() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const completedCount = useSelector(selectCompletedTasks);
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const visibleTasks = useSelector((state) =>
    selectTasksByCategory(state, selectedCategoryId),
  );
  const selectedCategory = useSelector((state) =>
    selectedCategoryId === "all"
      ? undefined
      : selectCategoryById(state, selectedCategoryId),
  );

  const handleEditTask = useCallback((task) => {
    setEditingTask(task);
    setFormOpen(true);
  }, []);

  const handleSaveTask = useCallback(
    ({ title, categoryId }) => {
      if (editingTask) {
        dispatch(editTask({ id: editingTask.id, title, categoryId }));
      } else {
        dispatch(addTask({ title, categoryId }));
      }
      setEditingTask(null);
      setFormOpen(false);
    },
    [dispatch, editingTask],
  );

  const handleCancelForm = useCallback(() => {
    setEditingTask(null);
    setFormOpen(false);
  }, []);

  function openNewTaskForm() {
    setEditingTask(null);
    setFormOpen(true);
  }

  const completionPercent =
    visibleTasks.length > 0
      ? Math.round(
          (visibleTasks.filter((task) => task.completed).length / visibleTasks.length) *
            100,
        )
      : 0;

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="app-content">
        <header className="topbar">
          <a aria-label="Daymark home" className="brand" href="/">
            <span className="brand-mark" aria-hidden="true">d.</span>
            <span>DAYMARK</span>
          </a>
          <span className="topbar-label">YOUR SPACE TO MAKE PROGRESS</span>
          <div className="today-label"><span /> TODAY</div>
        </header>

        <section className="welcome">
          <div>
            <p className="eyebrow">A FRESH PAGE, A NEW DAY</p>
            <h1>Make room for<br /><span>what matters.</span></h1>
            <p className="welcome-copy">
              Small steps add up. Gather your tasks, find your focus, and give yourself credit for every bit of progress.
            </p>
          </div>
          <div className="progress-card">
            <div className="progress-heading">
              <span>TODAY'S PROGRESS</span>
              <span>{completionPercent}%</span>
            </div>
            <div
              aria-label={`${completionPercent}% complete`}
              className="progress-track"
              role="progressbar"
              aria-valuemax="100"
              aria-valuemin="0"
              aria-valuenow={completionPercent}
            >
              <span style={{ width: `${completionPercent}%` }} />
            </div>
            <p>{completedCount} complete across all categories</p>
          </div>
        </section>

        <div className="workspace">
          <CategorySelector
            onSelect={setSelectedCategoryId}
            selectedCategoryId={selectedCategoryId}
          />

          <section className="tasks-panel" aria-labelledby="tasks-heading">
            <div className="tasks-header">
              <div>
                <p className="eyebrow">YOUR TASKS</p>
                <h2 id="tasks-heading">{selectedCategory?.name ?? "All tasks"}</h2>
                <p className="tasks-subtitle">
                  {visibleTasks.length === 0
                    ? "A clear space to start something."
                    : `${visibleTasks.length} ${visibleTasks.length === 1 ? "task" : "tasks"} · ${visibleTasks.filter((task) => task.completed).length} completed`}
                </p>
              </div>
              <button className="primary-button add-task-button" onClick={openNewTaskForm} type="button">
                <span aria-hidden="true">+</span> Add task
              </button>
            </div>

            {formOpen && (
              <div className="form-panel">
                <div className="form-title">
                  <h3>{editingTask ? "Edit task" : "A new task"}</h3>
                  <button aria-label="Close task form" onClick={handleCancelForm} type="button">×</button>
                </div>
                {categories.length === 0 ? (
                  <p className="no-categories">
                    Create a category first, then you can add a task.
                  </p>
                ) : (
                  <TaskForm
                    categories={categories}
                    onCancel={handleCancelForm}
                    onSave={handleSaveTask}
                    task={editingTask}
                  />
                )}
              </div>
            )}

            <TaskList categoryId={selectedCategoryId} onEditTask={handleEditTask} />
            <div className="list-footer">
              <span>ONE THING AT A TIME.</span>
              <span>{visibleTasks.filter((task) => task.completed).length} / {visibleTasks.length} DONE</span>
            </div>
          </section>
        </div>

        <footer className="app-footer">
          <span>BUILT FOR THE LITTLE WINS</span>
          <span>DAYMARK · PRODUCTIVITY TRACKER</span>
        </footer>
      </div>
    </main>
  );
}
