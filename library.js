let myLibrary = [];
const form = document.querySelector('form');
const formDisplay = document.querySelector('.input-form');
const addBookButton = document.querySelector('#add-new-book')
let booksContainer = document.querySelector('.books-container');
const clearButton = document.querySelector('#cancel');
const readCheckbox = document.querySelector('#read');
const deleteButton = document.querySelector('.delete');



//constructor function - creating new book
function Book(id, title, author, pages, year, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.year = year;
    this.read = read;
}

const bookOne = new Book(0, 'Lord of the Rings', 'J.R.R. Tolkien', 2564, 1954, true);
const bookTwo = new Book(1, 'The Shadow of the wind', 'Carlos Ruiz Zafón', 598, 2001, false);
const bookThree = new Book(2, 'Mężczyźni, którzy nienawidzą kobiet', 'Stieg Larsson', 456, 2005, true);

myLibrary.push(bookOne, bookTwo, bookThree);
initRender();

// event listeners

booksContainer.addEventListener('click', e => {
    if(e.target.classList.contains('delete'))
    {
        const currentId = e.target.parentElement.getAttribute('data-index');
        myLibrary =  myLibrary.filter(book => {
            return book.id != currentId;
        })
        e.target.parentElement.remove();
    }
})

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

function clearForm(){
    form.reset();
}

function initRender() {
    let html = '';
    myLibrary.forEach((book) => {
        html += generateHTML(book);
    })
    booksContainer.innerHTML = html;
    addedBook = document.querySelectorAll('.display-added-book');
}

function render(){
    booksContainer.innerHTML += generateHTML(myLibrary[myLibrary.length-1]); 
    addedBook = document.querySelectorAll('.display-added-book');
}

booksContainer.addEventListener('click', e => {
    if(e.target.id == 'read-status'){
        let index = e.target.parentElement.getAttribute('data-index');
        const currentReadStatus = e.target.checked;
        changeReadStatusInArray(index, currentReadStatus);
    }
})

function changeReadStatusInArray(index, currentReadStatus){
    console.log('before', myLibrary[index]);
    myLibrary[index].read = !myLibrary[index].read;
    console.log('after', myLibrary[index]);
}


function generateHTML({title, author, pages, year, read, id}){
    let html = '';
    let checkStatus = '';
    if(read === true) {
        checkStatus = 'checked';
    } 

    html = `
    <div class="display-added-book" data-index="${id}">
        <p>Title: <span>${title}</span></p>
        <p>Author: <span>${author}</span></p>
        <p>Pages: <span>${pages}</span></p>
        <p>Year of publication: <span>${year}</span></p>
        <label for="read-status" id="read-status">Read status:</label>
        <input type="checkbox" name="read-status" id="read-status" ${checkStatus}>
        <button class="delete">Delete</button>
    </div>
    `;
    return html;
}


function addBookToLibrary(){
    const titleName = document.querySelector('#title');
    const authorName = document.querySelector('#author');
    const numberOfPages = document.querySelector('#pages');
    const yearOfPublication = document.querySelector('#year');
    const readStatus = document.querySelector('#read');
    const newBookId = myLibrary.length;
    let book = new Book (newBookId, titleName.value, authorName.value, numberOfPages.value, yearOfPublication.value, form.read.checked);
    myLibrary.push(book);
}






