let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskNameInput = document.getElementById("taskName");
const taskPriorityInput = document.getElementById("taskPriority");
const taskCategoryInput = document.getElementById("taskCategory");
const tasksList = document.getElementById("tasks");

const saveTasksToLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const renderTasks = () => {
    tasksList.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");

        const priorityClass = 
            task.priority === "High" ? "priority-high" : 
            task.priority === "Medium" ? "priority-medium" : 
            "priority-low";

        taskItem.innerHTML = `
            <span class="${priorityClass}">${task.name} - (${task.priority}) [${task.category}]</span>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;

        tasksList.appendChild(taskItem);
    });
};

const addTask = () => {
    const name = taskNameInput.value.trim();
    const priority = taskPriorityInput.value;
    const category = taskCategoryInput.value;

    if (!name) {
        alert("Task name cannot be empty!");
        return;
    }

    tasks.push({ name, priority, category });
    saveTasksToLocalStorage();
    renderTasks();

    taskNameInput.value = "";
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    saveTasksToLocalStorage();
    renderTasks();
};

const editTask = (index) => {
    const task = tasks[index];
    taskNameInput.value = task.name;
    taskPriorityInput.value = task.priority;
    taskCategoryInput.value = task.category;

    deleteTask(index);
};

document.getElementById("addTaskBtn").addEventListener("click", addTask);

// Initial rendering
renderTasks();
