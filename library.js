let myLibrary = [];
const form = document.querySelector('form');
const formDisplay = document.querySelector('.input-form');
const addBookButton = document.querySelector('#add-new-book')

//constructor function - creating new book
function Book(title, author, pages, year, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.year = year;
    this.read = read;
}

const bookOne = new Book('Lord of the Rings', 'J.R.R. Tolkien', 2564, 1954, true);
const bookTwo = new Book('The Shadow of the wind', 'Carlos Ruiz Zafón', 598, 2001, true);
const bookThree = new Book('Mężczyźni, którzy nienawidzą kobiet', 'Stieg Larsson', 456, 2005, true);

myLibrary.push(bookOne, bookTwo, bookThree);

addBookButton.addEventListener('click', () => {
    formDisplay.style.display = 'block';
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary();
    console.log(myLibrary);
    formDisplay.style.display = 'none';
})

function addBookToLibrary(){
    const titleName = document.querySelector('#title');
    const authorName = document.querySelector('#author');
    const numberOfPages = document.querySelector('#pages');
    const yearOfPublication = document.querySelector('#year');
    const readStatus = document.querySelector('#read');
    let book = new Book (titleName.value, authorName.value, numberOfPages.value, yearOfPublication.value, readStatus.value);
    myLibrary.push(book);
}





