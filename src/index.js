import "./styles.css";
import { format } from "date-fns";
import { el } from "date-fns/locale";

// DATE FORMATTING (for all the dates?)
const now = new Date();
document.getElementById("dateDisplay").innerHTML = format(now, "yyyy-MM-dd");

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

// CONSTRUCTOR FUNCTION for Task
function Task(title, description, dueDate, priority) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
}

// CREATE (EMPTY) TASK AND APPEND TO THE LIST
function createTask() {
  let tasksList = document.querySelector("#later-list");
  tasksList.innerHTML = "";
  for (let i = 0; i < tasksLater.length; i++) {
    let task = tasksLater[i];
    let taskLine = document.createElement("li");
    taskLine.setAttribute("class", "toDo");
    taskLine.setAttribute("data-index", i);
    taskLine.innerHTML = `
        <div class="toDo-top-line">
            <h3>${task.title}</h3>
            <div class="task-buttons">
                <button type="button" id="done-button">✅</button>
                <button type="button" id="delete-button">❌</button>
            </div>
        </div>
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
  let dueDate = document.querySelector("#due-date").value;
  // display priority options text according to their index
  let prioritySelect = document.querySelector("#priority-select");
  let priorityValue = prioritySelect.value;
  let priorityText = prioritySelect.options[prioritySelect.selectedIndex].text;
  // create new task using user's input
  let newTask = new Task(title, description, dueDate, priorityText);
  // adding tasks to Later list
  tasksLater.push(newTask);
  createTask();
  // clear form and close modal
  form.reset();
  modal.close();
}

// ADD EVENT LISTENER TO THE FORM SUBMIT BUTTON
form.addEventListener("submit", addTask);

// ADD EVENT LISTENERS TO DONE AND DELETE BUTTONS
// ...to be continued
function removeTask(index) {
    const deleteButton = document.querySelector("#delete-button");
    deleteButton.addEventListener("click", function(e) {
        tasksList.splice(index, 1);
    render();
    }
)
  }
