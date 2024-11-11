import "./styles.css";
import { format } from "date-fns";
import { el } from "date-fns/locale";

// DATE FORMATTING (for all the dates?)
const now = new Date();
document.getElementById("dateDisplay").innerHTML = format(now, "yyyy-MM-dd");

// DISPLAY DATA FROM LOCAL STORAGE ON LOAD
window.addEventListener('load', () => {
  loadTasksFromLocalStorage();
  createTask();
});

// MODAL: open & close
const openButton = document.querySelector("[data-open-modal]");
const closeButton = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-modal]");

openButton.addEventListener("click", () => {
  modal.showModal();
});

closeButton.addEventListener("click", () => {
  modal.close();
});

// DEFINE SECTIONS
const form = document.querySelector("#new-task-form");
const tasksToday = [];
const tasksLater = [];

// CONSTRUCTOR FUNCTION for Task
function Task(title, description, dueDate, priority) {
  this.title = title;
  this.description = description;
  this.dueDate = new Date(dueDate);
  this.priority = priority;
  this.done = false;
}

// CREATE (EMPTY) TASK AND APPEND TO ONE OF THE LISTS
function createTask() {
  let todayList = document.querySelector("#today-list");
  let laterList = document.querySelector("#later-list");
  todayList.innerHTML = "";
  laterList.innerHTML = "";

  tasksLater.forEach((task, index) => {
    let taskLine = createTaskElement(task, index);
    
    if (isToday(task.dueDate)) {
      todayList.appendChild(taskLine);
    } else {
      laterList.appendChild(taskLine);
    }
  });
}

// ADD TASK CONTENT TO ONE OF THE LISTS
function createTaskElement(task, index) {
  let taskLine = document.createElement("li");
  taskLine.setAttribute("class", "toDo");
  if (task.done) {
    taskLine.classList.add('done');
  }
  taskLine.setAttribute("data-index", index);
  taskLine.innerHTML = `
    <div class="toDo-top-line">
        <h3>${task.title}</h3>
        <div class="task-buttons">
            <button type="button" class="done-button">&#x2713;</button>
            <button type="button" class="delete-button">&times;</button>
        </div>
    </div>
    <p>${task.description}</p>
        <div class="details-row">
            <div>${task.dueDate.toDateString()}</div>
            <div>${task.priority}</div>
         </div>
      `;
  return taskLine;
}

// ADD USER'S INPUT TO A TASK
function addTask(event) {
  // prevent from submission
  event.preventDefault();
  // make connection to form inputs
  let title = document.querySelector("#title").value;
  let description = document.querySelector("#description").value;
  let dueDate = document.querySelector("#due-date").value;
  // display priority options text according to their index
  let prioritySelect = document.querySelector("#priority-select");
  let priorityText = prioritySelect.options[prioritySelect.selectedIndex].text;
  // create new task using user's input
  let newTask = new Task(title, description, dueDate, priorityText);
  // adding tasks to Later list
  tasksLater.push(newTask);
  saveTasksToLocalStorage();
  createTask();
  // clear form and close modal
  form.reset();
  modal.close();
}

// ADD EVENT LISTENER TO THE FORM SUBMIT BUTTON
form.addEventListener("submit", addTask);

// CHECK IF TASK BELONGS TO TODAY'S LIST
function isToday(date) {
  const today = new Date();
  return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear();
}

// ADD EVENT LISTENERS FOR DONE AND DELETE TASK BUTTONS
document.querySelector("#today-list").addEventListener("click", handleTaskAction);
document.querySelector("#later-list").addEventListener("click", handleTaskAction);

// HANDLE DONE AND DELETE ACTIONS
function handleTaskAction(e) {
  if (e.target.classList.contains("delete-button")) {
    removeTask(e.target.closest("li"));
  } else if (e.target.classList.contains("done-button")) {
    markTaskAsDone(e.target.closest("li"));
  }
}

// REMOVE TASK FUNCTION
function removeTask(taskElement) {
  const index = parseInt(taskElement.getAttribute("data-index"));
  tasksLater.splice(index, 1);
  saveTasksToLocalStorage();
  createTask();
}

// MARK TASK AS DONE FUNCTION
function markTaskAsDone(taskElement) {
  const index = parseInt(taskElement.getAttribute("data-index"));
  tasksLater[index].done = true;
  saveTasksToLocalStorage();
  createTask();
}

// SAVING IN LOCAL STORAGE
function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasksLater));
}

// LOADING DATA FROM LOCAL STORAGE
function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasksLater.length = 0; // Clear the existing array
    JSON.parse(storedTasks).forEach(task => {
      const newTask = new Task(task.title, task.description, task.dueDate, task.priority);
      newTask.done = task.done;
      tasksLater.push(newTask);
    });
  }
}

