                                                      //                   Create To Do List                                    //

document.addEventListener('DOMContentLoaded', loadTasks);

const taskInput = document.getElementById('task-input'); // Get the input field
const addTaskBtn = document.getElementById('add-task-btn'); // Get the add task button
const taskList = document.getElementById('task-list'); // Get the task list

addTaskBtn.addEventListener('click', addTask);
taskList.addEventListener('click', removeTask);

function addTask() { // Add task function that adds the task to the list
    const taskText = taskInput.value.trim(); // Get the task text from the input field
    if (taskText === '') return;  // Return if the task text is empty

    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;  // Set the task text as the content of the task item

    const deleteBtn = document.createElement('button'); // Create the delete button
    deleteBtn.textContent = 'Delete'; // Set the text of the delete button to 'Delete'
    taskItem.appendChild(deleteBtn);

    taskList.appendChild(taskItem); 

    saveTaskToLocalStorage(taskText); // Save the task to local storage

    taskInput.value = ''; // Clear the input field
}

function removeTask(e) { // Remove task function that removes the task from the list
    if (e.target.tagName === 'BUTTON') {
        const taskItem = e.target.parentElement;
        removeTaskFromLocalStorage(taskItem.textContent.replace('Delete', '').trim()); // Remove the task from local storage when the delete button is clicked
        taskList.removeChild(taskItem); // 
    }
}

function saveTaskToLocalStorage(task) { // Save task function that saves the task to local storage
    let tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save the tasks to local storage
}

function removeTaskFromLocalStorage(task) {// Remove task function that removes the task from local storage
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(t => t !== task); // Remove the task from local storage
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save the tasks to local storage and JSON
}

function getTasksFromLocalStorage() {
    let tasks; // Create an empty array to store the tasks
    if (localStorage.getItem('tasks') === null) { // Check if the tasks array is empty  if its empty, create an empty array
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks')); // Parse the tasks array from local storage 
    }
    return tasks;
}

function loadTasks() { // Load tasks function that loads the tasks from local storage
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.textContent = task;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        taskItem.appendChild(deleteBtn);

        taskList.appendChild(taskItem);
    });
}