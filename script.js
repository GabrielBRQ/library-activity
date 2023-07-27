let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.report = `${title} by ${author}, ${pages} pages, ${read}.`;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

// Select footer element
const footer = document.querySelector('.sticky-footer');

// Function to show footer when scrolled
function showFooterOnScroll() {

  // Verify initial window position
  const scrolled = window.scrollY;

  if (scrolled > 100) {
    footer.style.opacity = '1';
    footer.style.visibility = 'visible';
  }
}

// event listener with scroll
window.addEventListener('scroll', showFooterOnScroll);

const numberInput = document.getElementById("myNumberInput");
numberInput.addEventListener("wheel", (event) => {
  event.preventDefault();
});

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

// Function to generate a random color in hexadecimal format (#RRGGBB)
function getRandomColor() {
  const letters = '23456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 14)];
  }
  return color;
}
let currentLeftPosition = 55;
// Function to create a new div to display book information
function createBookCard(book) {
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');
  


  // Generate a random background color for the book card
  const randomColor = getRandomColor();
  bookCard.style.backgroundColor = randomColor;

  const bookInfo = document.createElement('p');
  bookInfo.textContent = `${book.title}`;
  bookCard.appendChild(bookInfo);

  bookCard.style.left = `${currentLeftPosition}vh`;

  // Append the new book card to the book shelf (or any other container)
  const bookShelf = document.querySelector('.book-shelf');
  bookShelf.appendChild(bookCard);

  currentLeftPosition += 7;
}


// Add event listener to the form for form submission
bookForm.addEventListener('submit', handleFormSubmit);
