const myLibrary = [];

function Book(title, author, read) {
  this.title = title;
  this.author = author;
  this.read = read;
}

function addBookToLibrary(title, author, read) {
  const newBook = new Book(title, author, read);
  myLibrary.push(newBook);
}

addBookToLibrary("The Hobbit", "J.R.Tolkien", false)
addBookToLibrary("Slaughterhouse-Five", "K.Vonnegut", true)

console.log(myLibrary[1]);