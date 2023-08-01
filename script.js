let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.report = `${title} by ${author}, ${pages} pages.`;
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
  
  // Get the form input values
  const form = event.target;
  const title = form.elements['book-name'].value;
  const author = form.elements['author'].value;
  const pages = parseInt(form.elements['myNumberInput'].value);
  const read = form.elements['fav_language'].value === 'yes' ? 'read' : 'not read';

  // Call addBookToLibrary function with the form input values
  addBookToLibrary(title, author, pages, read);

  // Create a new div to display the book information and append it to the page
  const newBook = myLibrary[myLibrary.length - 1];
  createBookCard(newBook);

  // Reset the form fields
  form.reset();

  // Hide the book form after submission
  closeBookForm();
}

//function to update invetory counter
function updateBookCount() {
  const bookInventoryElement = document.querySelector(".book-inventory p:last-child");
  const currentInventoryCount = parseInt(bookInventoryElement.textContent);
  const newInventoryCount = myLibrary.length;
  bookInventoryElement.textContent = newInventoryCount;
}

//function to update read counter
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
  bookInfo.textContent = `${book.report}`;
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
