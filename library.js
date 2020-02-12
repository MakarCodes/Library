let myLibrary = [];
const form = document.querySelector('form');
const formDisplay = document.querySelector('.input-form');
const addBookButton = document.querySelector('#add-new-book')
let booksContainer = document.querySelector('.books-container');
const clearButton = document.querySelector('#cancel');
const readCheckbox = document.querySelector('#read');
const deleteButton = document.querySelector('.delete');
const search = document.querySelector('#search');
let userText = '';

class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(id) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.id == id) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

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

// myLibrary.push(bookOne, bookTwo, bookThree);
myLibrary = Store.getBooks();
initRender();

// event listeners

booksContainer.addEventListener('click', e => {
    if(e.target.classList.contains('delete'))
    {
        const currentId = e.target.parentElement.getAttribute('data-index');
        myLibrary =  myLibrary.filter(book => {
            return book.id != currentId;
        })
        Store.removeBook(currentId);
        e.target.parentElement.remove();
    }
    console.log(myLibrary)
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
    bookFilteringByAuthor(userText);
    // bookFilteringByTitle(userText);
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
}

function filterRender(bookArray) {
    let html = '';
    bookArray.forEach((book) => {
        html += generateHTML(book);
    });
    booksContainer.innerHTML = html;
}

function render(){
    booksContainer.innerHTML += generateHTML(myLibrary[myLibrary.length-1]); 
}

booksContainer.addEventListener('click', e => {
    let index = e.target.parentElement.getAttribute('data-index');
    const currentReadStatus = e.target.checked;
    if(e.target.id == `read-status${index}`){
        changeReadStatusInArray(index, currentReadStatus);
    }
})

function changeReadStatusInArray(index, currentReadStatus){
    myLibrary[index].read = currentReadStatus;
    document.getElementById(`read-status${index}`).checked = currentReadStatus;
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
        <p class="author">Author: <span>${author}</span></p>
        <p>Pages: <span>${pages}</span></p>
        <p>Year of publication: <span>${year}</span></p>
        <label for="read-status${id}">Read status:</label>
        <input type="checkbox" name="read-status" id="read-status${id}" ${checkStatus}>
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
    const newBookId = myLibrary.length;
    let book = new Book (newBookId, titleName.value, authorName.value, numberOfPages.value, yearOfPublication.value, form.read.checked);
    myLibrary.push(book);
    Store.addBook(book);
}


function bookFilteringByAuthor(userText) {
    let filteredArrayByAuthors = myLibrary.filter(singleBook => 
        singleBook.author.toLowerCase().includes(userText) || 
        singleBook.title.toLowerCase().includes(userText));
    filterRender(filteredArrayByAuthors);
    
}

function bookFilteringByTitle(userText) {
    let filteredArrayByTitles = myLibrary.filter(book => book.title.toLowerCase().includes(userText));
    filterRender(filteredArrayByTitles);
}

search.addEventListener('keyup', e => {
    userText = search.value.trim().toLowerCase(); 
    bookFilteringByAuthor(userText);
    // bookFilteringByTitle(userText);
    
});


    // jakaś funkcja filtrująca z parametrem propertiesArray i iteruje po tej tablicy 
    //w poszukiwaniu "matchów" w zadeklarowanych propertiesach.


   // 1. Filtrowanie warunkowe: filtrujemy tablice wszystkich książek i zwracamy rekord jeśli jest "match" w property author LUB proerty title
    // 2. Odfiltrowanie powtarzających się elementów z tablicy (Lodash (_.uniq))

