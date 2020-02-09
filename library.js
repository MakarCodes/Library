let myLibrary = [];
const form = document.querySelector('form');
const formDisplay = document.querySelector('.input-form');
const addBookButton = document.querySelector('#add-new-book')
let booksContainer = document.querySelector('.books-container');
const clearButton = document.querySelector('#cancel');
const readCheckbox = document.querySelector('#read');

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
render();

// event listeners

addBookButton.addEventListener('click', () => {
    formDisplay.style.display = 'block';
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary();
    formDisplay.style.display = 'none';
    render();
    clearForm();
})

form.addEventListener('click', e => {
    if(e.target.classList.contains('fa-window-close')){
        formDisplay.style.display = 'none';
        clearForm();
    }
})

clearButton.addEventListener('click', e => {
    clearForm();
})

// functions

function checkboxValidation(){
    if(form.read.checked){
        return true;
    } else {
        return false;
    }
}

function clearForm(){
    form.reset();
}

function render(){
    let html = '';
    myLibrary.forEach(book => {
        //object restructuring
        let {title, author, pages, year, read} = book;
        html += generateHTML(title, author, pages, year, checkboxValidation());
    })
    booksContainer.innerHTML = html;
}


function generateHTML(title, author, pages, year, read){
    let html = '';
    if(read === true) {
        html = `
        <div class="display-added-book">
            <p>Title: <span>${title}</span></p>
            <p>Author: <span>${author}</span></p>
            <p>Pages: <span>${pages}</span></p>
            <p>Year of publication: <span>${year}</span></p>
            <label for="r1" id="r1">Read status:</label>
            <input type="checkbox" name="r1" id="r1" checked>
        </div>
        `;
    } else if (read === false)  {
        html = `
        <div class="display-added-book">
            <p>Title: <span>${title}</span></p>
            <p>Author: <span>${author}</span></p>
            <p>Pages: <span>${pages}</span></p>
            <p>Year of publication: <span>${year}</span></p>
            <label for="r2" id="r2">Read status:</label>
            <input type="checkbox" name="r2" id="r2">
        </div>
        `;
    }

    return html;
}


function addBookToLibrary(){
    const titleName = document.querySelector('#title');
    const authorName = document.querySelector('#author');
    const numberOfPages = document.querySelector('#pages');
    const yearOfPublication = document.querySelector('#year');
    const readStatus = document.querySelector('#read');
    let book = new Book (titleName.value, authorName.value, numberOfPages.value, yearOfPublication.value, readStatus.value);
    myLibrary.push(book);
}






