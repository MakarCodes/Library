let myLibrary = [];
const form = document.querySelector('form');
const formDisplay = document.querySelector('.input-form');
const addBookButton = document.querySelector('#add-new-book')
let booksContainer = document.querySelector('.books-container');

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

function render(){
    let html = '';
    myLibrary.forEach(book => {
        html += `
        <div class="display-added-book">
            <p>Title: <span>${book.title}</span></p>
            <p>Author: <span>${book.author}</span></p>
            <p>Pages: <span>${book.pages}</span></p>
            <p>Year of publication: <span>${book.year}</span></p>
        </div>
        `;
    })
    booksContainer.innerHTML = html;
}

render();


addBookButton.addEventListener('click', () => {
    formDisplay.style.display = 'block';
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary();
    console.log(myLibrary);
    formDisplay.style.display = 'none';
    render();
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






