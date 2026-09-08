const tasks = [];

let taskId = 0;

const form = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const listTasks = document.querySelector(".listTasks");


function addTask() {

    const text = taskInput.value.trim();

    // Do not add empty tasks
    if (text === "") {
        return;
    }

    // Create task object
    const newTask = {
        task_id: taskId,
        text: text,
        done: false
    };

    // Add task to array
    tasks.push(newTask);

    // Create task container
    const taskElement = document.createElement("div");

    taskElement.classList.add("task");

    // Add data-task-id
    taskElement.dataset.taskId = newTask.task_id;


    // Create delete button
    const deleteButton = document.createElement("button");

    deleteButton.classList.add("delete-btn");

    deleteButton.innerHTML =
        '<i class="fa-solid fa-xmark"></i>';

    deleteButton.addEventListener("click", deleteTask);


    // Create checkbox
    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.addEventListener("change", doneTask);


    // Create label
    const label = document.createElement("label");

    label.textContent = newTask.text;


    // Add elements to task
    taskElement.appendChild(deleteButton);
    taskElement.appendChild(checkbox);
    taskElement.appendChild(label);


    // Add task to DOM
    listTasks.appendChild(taskElement);


    // Prepare next ID
    taskId++;


    // Clear input
    taskInput.value = "";

    // Put cursor back into input
    taskInput.focus();
}


function doneTask(event) {

    const checkbox = event.target;

    const taskElement = checkbox.closest(".task");

    const id = Number(taskElement.dataset.taskId);


    // Find task in array
    const task = tasks.find(function(task) {
        return task.task_id === id;
    });


    if (task) {

        // Update done property
        task.done = checkbox.checked;

        // Update DOM
        taskElement.classList.toggle("done", task.done);
    }
}


function deleteTask(event) {

    const button = event.target.closest(".delete-btn");

    const taskElement = button.closest(".task");

    const id = Number(taskElement.dataset.taskId);


    // Find task index
    const index = tasks.findIndex(function(task) {
        return task.task_id === id;
    });


    if (index !== -1) {

        // Delete from array
        tasks.splice(index, 1);

        // Delete from DOM
        taskElement.remove();
    }
}


form.addEventListener("submit", function(event) {

    event.preventDefault();

    addTask();

});
