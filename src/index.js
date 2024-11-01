import "./styles.css";

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
const doTodayList = document.querySelector("#today-list");
const doLaterList = document.querySelector("#later-list");
const tasksToday = [];
const tasksLater = [];

// GET INPUT FROM MODAL

// CREATE NEW LIST ITEM

// CONSTRUCTOR FUNCTION for Task
function Task(title, description, dueDate, priority) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
}

// CREATE TASK AND APPEND TO THE LIST
function createTask() {
  let tasksList = document.querySelector("#later-list");
  tasksList.innerHTML = "";
  for (let i = 0; i < tasksLater.length; i++) {
    let task = tasksLater[i];
    let taskLine = document.createElement("li");
    taskLine.setAttribute("class", "toDo");
    taskLine.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
         <div class="details-row">
             <div>${task.dueDate}</div>
             <div>${task.priority}</div>
         </div>
          `;
    tasksList.appendChild(taskLine);
  }
}

// ADD USER'S INPUT TO A TASK
function addTask(event) {
  // prevent from submission
  event.preventDefault();

  // make connection to form inputs
  let title = document.querySelector("#title").value;
  let description = document.querySelector("#description").value;
  let dueDate = document.querySelector("#date").textContent;
  let priority = document.querySelector(".custom-select select").value;

  let newTask = new Task(title, description, dueDate, priority);
  // adding tasks to Later list
  tasksLater.push(newTask);
  createTask();
  // clear form and close modal
  form.reset();
  modal.close();
}

// ADD EVENT LISTENER TO THE FORM SUBMIT BUTTON
form.addEventListener("submit", addTask);
