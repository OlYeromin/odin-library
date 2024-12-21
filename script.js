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
  if (text != null)
    specificELement.textContent = text;
  return specificELement;
}

function addBookToLibrary(title, author, read) {
  const newBook = new Book(title, author, read);
  myLibrary.push(newBook);
}

addBookToLibrary("The Hobbit", "J.R.Tolkien", false)
addBookToLibrary("Slaughterhouse-Five", "K.Vonnegut", true)

const addButton = document.querySelector("#add");
const dialog = document.querySelector("#add-book-dialog");
const addBook = document.querySelector("#add-book");

addButton.addEventListener("click", () => {
  dialog.showModal();
});

addBook.addEventListener("click", (event) => {
  const bookname = document.querySelector("input#title").value;
  const author = document.querySelector("input#author").value;
  const bookStatusInput = document.querySelector(`input[name="read-or-not"]:checked`);
  if (bookname == "" || author == "") {
    alert("You should fill out all the fields.");
    event.preventDefault();
    return;
  };
  if (bookStatusInput == null) {
    alert("Please say if you have read the book");
    event.preventDefault();
    return;
  }
})

function createBookCard(bookname, author, read) {
  const bookList = document.querySelector("main");
  const newBookCard = createSpecificElement("div", "book-card", null);
    newBookCard.appendChild(createSpecificElement("h3", null, bookname));
    newBookCard.appendChild(createSpecificElement("p", null, author));
    if (read) 
      newBookCard.appendChild(createSpecificElement("p", null, "Read"))
    else 
      newBookCard.appendChild(createSpecificElement("p", null, "Not read"));
    const buttonList = createSpecificElement("div", "book-operations", null);
      buttonList.appendChild(createSpecificElement("button", null, "Delete book"));
      buttonList.appendChild(createSpecificElement("button", null, "Read"));
    newBookCard.appendChild(buttonList);
  bookList.appendChild(newBookCard);
} 