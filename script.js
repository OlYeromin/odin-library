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
addButton.addEventListener("click", addBookCard);

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
      buttonList.appendChild(createSpecificElement("button", "delete-card", "Delete book"));
      buttonList.appendChild(createSpecificElement("button", null, "Read"));
    newBookCard.appendChild(buttonList);
  bookList.appendChild(newBookCard);
} 