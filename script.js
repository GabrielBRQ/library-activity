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
  const currentCount = parseInt(bookInventoryElement.textContent);
  const newCount = currentCount + 1;
  bookInventoryElement.textContent = newCount;
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
  bookButton.textContent = book.read == 'read' ? 'read' : 'not read';
  bookCard.appendChild(bookButton);

  bookButton.addEventListener('click', () => {
    if (book.read === 'read') {
      book.read = 'not read';
      bookButton.textContent = 'not read';
      bookButton.style.backgroundColor = '#D05557';
    } else {
      book.read = 'read';
      bookButton.textContent = 'read';
      bookButton.style.backgroundColor = '#71aca6';
    }
  });

  // Append the new book card to the book shelf
  const bookShelf = document.querySelector('.book-shelf');
  bookShelf.appendChild(bookCard);

  updateBookCount();
}


// Add event listener to the form for form submission
bookForm.addEventListener('submit', handleFormSubmit);
