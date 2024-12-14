const myLibrary = [];

function Book(title, author, read) {
  this.title = title;
  this.author = author;
  this.read = read;
}

function createSpecificElement(element, className, text) {
  specificELement = document.createElement(element);
  if (className != null)
    specificELement.classList.add(className);
  if (className != null)
    specificELement.innerText = text;
  return specificELement;
}

function addBookToLibrary(title, author, read) {
  const newBook = new Book(title, author, read);
  myLibrary.push(newBook);
}

addBookToLibrary("The Hobbit", "J.R.Tolkien", false)
addBookToLibrary("Slaughterhouse-Five", "K.Vonnegut", true)

const addButton = document.querySelector("#add");
addButton.addEventListener("click", addBookCard);

function addBookCard() {
  alert(`You pressed the "Add" button!`);
}

function createBookCard() {
  const bookList = document.querySelector("main");
  const newBookCard = document.createElement("div");
  newBookCard.classList.add("book-card");
  newBookCard.appendChild(document.createElement("h3"));
  newBookCard.appendChild(document.createElement("p"));
  newBookCard.appendChild(document.createElement("p"));
  newBookCard.appendChild(document.createElement("div"));
  bookList.appendChild(newBookCard);
} 