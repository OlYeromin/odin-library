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
/*addButton.addEventListener("click", addBookCard());*/
const bookList = document.querySelector("main");
deletionDialog = document.querySelector("#deletion-dialog");
confirmationButton = document.querySelector("#deletion-dialog > .confirm");
cancelButton = document.querySelector("#deletion-dialog > .cancel");

bookList.onclick = function(event) {
  let target = event.target;
  if (target.className != "delete-card") return;
  deletionDialog.showModal();
  confirmationButton.onclick = () => {      // If you use event listeners, you will need to remove them
    target.parentNode.parentNode.remove();  // after clicking the cancelButton, which proved to be impossible. 
    deletionDialog.close();                 // Otherwise the books you decided not to delete will be deleted
  };                                        // once you finally choose to delete some book. 
};

cancelButton.addEventListener("click", () => {
  deletionDialog.close()  
});
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
  if (bookStatusInput.value === "true") createBookCard(bookname, author, true);
    else createBookCard(bookname, author, false);
  event.preventDefault();
  dialog.close();
});

dialog.addEventListener("close", (e) => {
  document.querySelector("#book-info").reset();
})

function createBookCard(bookname, author, read) {
  const newBookCard = createSpecificElement("div", "book-card", null);
    newBookCard.appendChild(createSpecificElement("h3", null, bookname));
    newBookCard.appendChild(createSpecificElement("p", null, author));
    if (read) 
      newBookCard.appendChild(createSpecificElement("p", null, "Read"))
    else 
      newBookCard.appendChild(createSpecificElement("p", null, "Not read"));
    const buttonList = createSpecificElement("div", "book-operations", null);
      buttonList.appendChild(createSpecificElement("button", "delete-card", "Delete book"));
      buttonList.appendChild(createSpecificElement("button", null, "Read"));
    newBookCard.appendChild(buttonList);
  bookList.appendChild(newBookCard);
} 