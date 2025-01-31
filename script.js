const myLibrary = [];
var currentID = -1;

function Book(title, author, read, bookID) {
  this.title = title;
  this.author = author;
  this.read = read;
  this.bookID = bookID;
  this.toggleRead = function() {
    if (this.read) 
      this.read = false
    else 
      this.read = true;
  }
}

function toggleCardRead(bookCard) {
  const statusPara = document.querySelector(`#${bookCard.id} > p.book-status`);
  if (bookCard.classList.contains("read")) {
    statusPara.textContent = "Not read";
    bookCard.classList.remove("read");
    bookCard.classList.add("unread");
  }
  else {
    statusPara.textContent = "Read";
    bookCard.classList.remove("unread");
    bookCard.classList.add("read");
  }
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
  currentID += 1;
  const newBook = new Book(title, author, read, currentID);
  myLibrary.push(newBook);
  return newBook;
}

function removeFromLibrary(id) {
  bookIndex = myLibrary.findIndex(book => book.bookID == id);
  myLibrary.splice(bookIndex, 1);
}

addBookToLibrary("The Hobbit", "J.R.Tolkien", false)
addBookToLibrary("Slaughterhouse-Five", "K.Vonnegut", true)

const addButton = document.querySelector("#add");
const bookList = document.querySelector("main");
deletionDialog = document.querySelector("#deletion-dialog");
confirmationButton = document.querySelector("#deletion-dialog > .confirm");
cancelButton = document.querySelector("#deletion-dialog > .cancel");

bookList.onclick = function(event) {
  let target = event.target;
  if (target.className == "delete-card") {
    deletionDialog.showModal();
    confirmationButton.onclick = () => {      
      const selectedCard = target.parentNode.parentNode;
      removeFromLibrary(selectedCard.id);
      selectedCard.remove();
      deletionDialog.close();
    };
  }
  else if (target.className == "toggle-read") {
    const selectedCard = target.parentNode.parentNode;
    libraryIndex = selectedCard.id.substring(4);
    toggleCardRead(selectedCard);
    myLibrary[libraryIndex].toggleRead();
  }
  else return;
};
// If you use event listeners, you will need to remove them
// after clicking the cancelButton, which proved to be impossible. 
// Otherwise the books you decided not to delete will be deleted
// once you finally choose to delete some book. 

cancelButton.addEventListener("click", () => {
  deletionDialog.close()  
});

const dialog = document.querySelector("#add-book-dialog");
const addBook = document.querySelector("#add-book");

addButton.addEventListener("click", () => {
  dialog.showModal();
});

addBook.addEventListener("click", (event) => {
  const bookTitle = document.querySelector("input#title").value;
  const author = document.querySelector("input#author").value;
  const bookStatusInput = document.querySelector(`input[name="read-or-not"]:checked`);
  if (bookTitle == "" || author == "") {
    alert("You should fill out all the fields.");
    event.preventDefault();
    return;
  };
  if (bookStatusInput == null) {
    alert("Please say if you have read the book");
    event.preventDefault();
    return;
  }
  const bookStatus = (bookStatusInput.value === "true");
  newBook = addBookToLibrary(bookTitle, author, bookStatus);
  createBookCard(newBook);
  event.preventDefault();
  dialog.close();
});

dialog.addEventListener("close", (e) => {
  document.querySelector("#book-info").reset();
})

function createBookCard(book) {
  const newBookCard = createSpecificElement("div", "book-card", null);
    newBookCard.appendChild(createSpecificElement("h3", null, book.title));
    newBookCard.appendChild(createSpecificElement("p", null, book.author));
    if (book.read) {
      newBookCard.appendChild(createSpecificElement("p", "book-status", "Read"))
      newBookCard.classList.add("read");
    }
    else {
      newBookCard.appendChild(createSpecificElement("p", "book-status", "Not read"));
      newBookCard.classList.add("unread");
    }
    const buttonList = createSpecificElement("div", "book-operations", null);
      buttonList.appendChild(createSpecificElement("button", "delete-card", "Delete book"));
      buttonList.appendChild(createSpecificElement("button", "toggle-read", "Toggle read"));
    newBookCard.appendChild(buttonList);
  newBookCard.id = `card${book.bookID}`;
  bookList.appendChild(newBookCard);
}

const hiddenBooks = {
  unread : false,
  read : false
};

const hideButtons = document.querySelectorAll("button.hide");
hideButtons.forEach(hideButton => {
  hideButton.addEventListener("click", (event) => {
    if (event.target.tagName == "BUTTON") {
      var targetClass = event.target.classList[1];
      var targetSpan = event.target.querySelector("span");
    }
    else {
      const parentButton = event.target.parentElement;
      var targetClass = parentButton.classList[1];
      var targetSpan = parentButton.querySelector("span");
    }
    const selectedBooks = document.querySelectorAll(`div.book-card.${targetClass}`);
    if (hiddenBooks[targetClass] === false) {
      selectedBooks.forEach((selectedBook) => {
        selectedBook.classList.add("hidden");
      });
      targetSpan.textContent = `Display ${targetClass}`
      Object.defineProperty(hiddenBooks, targetClass, {value : true});
    }
    else {
      selectedBooks.forEach((selectedBook) => {
        selectedBook.classList.remove("hidden");
      });
      targetSpan.textContent = `Hide ${targetClass}`
      Object.defineProperty(hiddenBooks, targetClass, {value : false});
    }
  })
});