let myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

const bookForm = document.querySelector(".book-form");
const addButton = document.querySelector(".addButton");
const closeButton = document.querySelector(".close-button")

function showBookForm(){
  bookForm.style.display = 'grid';
}

function closeBookForm(){
  bookForm.style.display = 'none';
}

//Add or close book form div
addButton.addEventListener('click', showBookForm);
closeButton.addEventListener('click', closeBookForm);

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  
  let bookValidation = false;
  bookValidation = verifyForm(bookValidation);

  // Get the form input values
  const form = event.target;
  const title = form.elements['book-name'].value;
  const author = form.elements['author'].value;
  const pages = parseInt(form.elements['myNumberInput'].value);
  const read = form.elements['fav_language'].value === 'yes' ? 'read' : 'not read';


  if(bookValidation == true){
    // Call addBookToLibrary function with the form input values
    addBookToLibrary(title, author, pages, read);
  
    //Create a new div to display the book information and append it to the page
    const newBook = myLibrary[myLibrary.length - 1];
    createBookCard(newBook);
  
    //Reset the form fields
    form.reset();
  
    //Hide the book form after submission
    closeBookForm();
  }

}

//Function to verify input form
function verifyForm(bookValidation){
  const bookName = document.getElementById("book-name");
  const bookNameError = document.querySelector("#book-name + span.error");
  const author = document.getElementById("author");
  const authorError = document.querySelector("#author + span.error");
  const pages = document.getElementById("myNumberInput");
  const pagesError = document.querySelector("#myNumberInput + span.error");

  if (bookName.validity.valueMissing) {
    bookNameError.style.display = 'block';
    bookNameError.textContent = "You need to enter your book name";
    return bookValidation;
  }
  if(author.validity.valueMissing) {
    authorError.style.display = 'block';
    authorError.textContent = "You need to enter author name";
    return bookValidation;
  }
  if(pages.validity.valueMissing) {
    pagesError.style.display = 'block';
    pagesError.textContent = "You need to put how many pages the book have";
    return bookValidation;
  }
  if(pages.validity.rangeUnderflow) {
    pagesError.style.display = 'block';
    pagesError.textContent = "The book have to have more pages";
    return bookValidation;
  }

  bookValidation = true;
  return bookValidation;
}

//Function to update invetory counter
function updateBookCount() {
  const bookInventoryElement = document.querySelector(".book-inventory p:last-child");
  const currentInventoryCount = parseInt(bookInventoryElement.textContent);
  const newInventoryCount = myLibrary.length;
  bookInventoryElement.textContent = newInventoryCount;
}

//Function to update read counter
function updateReadCount(read, created) {
  const bookReadElement = document.querySelector(".book-count p:last-child");
  const currentReadCount = parseInt(bookReadElement.textContent);
  
  if(read == 'read'){
    const newReadCount = currentReadCount + 1;
    bookReadElement.textContent = newReadCount;
  }else if(currentReadCount > 0){
    if(created){
      return;
    }
    const newReadCount = currentReadCount - 1;
    bookReadElement.textContent = newReadCount;
  }
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
}

function handleDeleteButtonClick(event) {
  const bookCard = event.target.closest('.book-card');
  const bookIndex = Array.from(bookCard.parentElement.children).indexOf(bookCard);

  if (bookIndex !== -1) {
    removeBookFromLibrary(bookIndex);
    bookCard.remove();
    updateBookCount();
    updateReadCount(myLibrary[bookIndex]?.read, false);
  }
}

// Function to create a new div to display book information
function createBookCard(book) {
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');

  const bookTitle = document.createElement('h1');
  bookTitle.textContent = `${book.title}`;
  bookCard.appendChild(bookTitle);

  const bookInfo = document.createElement('p');
  bookInfo.textContent = `${book.title} by ${book.author}, ${book.pages} pages.`;
  bookCard.appendChild(bookInfo);

  const bookButton = document.createElement('button');
  bookButton.textContent = book.read === 'read' ? 'read' : 'not read';
  bookCard.appendChild(bookButton);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'delete';
  bookCard.appendChild(deleteButton);

  deleteButton.addEventListener('click', handleDeleteButtonClick);

  if (book.read === 'read') {
    bookButton.style.backgroundColor = '#71aca6';
  } else {
    bookButton.style.backgroundColor = '#D05557';
  }

  bookButton.addEventListener('click', () => {
    if (book.read === 'read') {
      book.read = 'not read';
      bookButton.textContent = 'not read';
      updateReadCount(book.read, false);
      bookButton.style.backgroundColor = '#D05557';
    } else {
      book.read = 'read';
      bookButton.textContent = 'read';
      updateReadCount(book.read, false);
      bookButton.style.backgroundColor = '#71aca6';
    }
  });

  // Append the new book card to the book shelf
  const bookShelf = document.querySelector('.book-shelf');
  bookShelf.appendChild(bookCard);


  updateReadCount(book.read, true);
  updateBookCount();
}


// Add event listener to the form for form submission
bookForm.addEventListener('submit', handleFormSubmit);
