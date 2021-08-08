const STORAGE_KEY = "BOOKS_APPS";

let books = [];

function isStorageExist() {
    if (typeof(Storage) === undefined) {
        alert("Browser Anda Tidak Mendukung Local Storage")
        return false;
    }

    return true;
}

function saveData() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
    if (data !== null) books = data;
    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if (isStorageExist()) {
        saveData();
    }
}

function composeBookObject(BookTittle, BookAuthor, BookYear, BookIsCompleted) {
    return {
        id: +new Date(),
        BookTittle,
        BookAuthor,
        BookYear: parseInt(BookYear),
        BookIsCompleted,
    };
}

function findBook(bookId) {
    for (book of books) {
        if (book.id === bookId) return book;
    }
    return null;
}

function findBookIndex(bookId) {
    let index = 0;
    for (book of books) {
        if (book.id === bookId) return index;
        index++
    }
    return -1;
}

function refreshDataFromBook() {
    const listCompleted = document.getElementById(CompletedList);
    const Uncompleted = document.getElementById(InCompletedList);

    for (book of books) {
        const newbook = MakeBook(
            book.BookTittle,
            book.BookAuthor,
            book.BookYear,
            book.BookIsCompleted,
        );
        newbook[APPS_ITEMID] = book.id;
        if (book.BookIsCompleted) {
            listCompleted.append(newbook);
        } else {
            Uncompleted.append(newbook);
        }
    }
}