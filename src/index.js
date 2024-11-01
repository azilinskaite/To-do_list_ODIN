import "./styles.css";

// MODAL

const openButton = document.querySelector("[data-open-modal]");
const closeButton = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-modal]");

openButton.addEventListener("click", () => {
  modal.showModal();
});

closeButton.addEventListener("click", () => {
  modal.close();
});

// GET INPUT FROM MODAL

const taskTitle = document.querySelector("#title");
const doTodayList = document.querySelector("#today-list");
const doLaterList = document.querySelector("#later-list");

// CREATE NEW LIST ITEM


// LIBRARY EXAMPLE
// const myLibrary = [];

// function Book(title, author, pages, read) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
// }

// function render() {
//     let libraryBook = document.querySelector("#books-container"); // why query selector for whole container?
//     libraryBook.innerHTML = "";
//     for (let i = 0; i < myLibrary.length; i++) {
//       let book = myLibrary[i];
//       let bookVisual = document.createElement("div");
//       bookVisual.setAttribute("class", "book-card");
//       bookVisual.innerHTML = `
//           <h2 class="title">${book.title}</h2>
//           <h4 class="author">${book.author}</h4>
//           <p>${book.pages} pages</p>
//           <p class="read-status">${book.read ? "Read" : "Want to read"}</p>
//           <button class="toggle-read-btn" onclick="toggleRead(${i})">Change read status</button>
//           <button class="remove-btn" onclick="removeBook(${i})">Remove</button>
//           `;
//       libraryBook.appendChild(bookVisual);
//     }
//   }
  
//   function removeBook(index) {
//       myLibrary.splice(index, 1);
//       render();
//   }
  
//   function addBook() {
//     let title = document.querySelector("#title").value;
//     let author = document.querySelector("#author").value;
//     let pages = document.querySelector("#pages").value;
//     let read = document.querySelector("#read").checked;
  
//     let newBook = new Book(title, author, pages, read);
//     myLibrary.push(newBook);
//     render();
//     modal.close();
//   }





