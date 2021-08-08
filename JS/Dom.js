const InCompletedList = "incompleteBookshelfList";
const CompletedList = "completeBookshelfList";
const APPS_ITEMID = "itemId"

//Input data buku
function AddBook() {
    const BookTittle = document.getElementById("inputBookTitle").value;
    const BookAuthor = document.getElementById("inputBookAuthor").value;
    const BookYear = document.getElementById("inputBookYear").value;
    const BookIsCompleted = document.getElementById("inputBookIsComplete").checked;

    const bookObject1 = composeBookObject(BookTittle, BookAuthor, BookYear, true);
    const bookObject2 = composeBookObject(BookTittle, BookAuthor, BookYear, false);

    if (BookIsCompleted == true) {
        const CompletedBook = document.getElementById(CompletedList);
        const output1 = MakeBook(BookTittle, BookAuthor, BookYear, true);
        output1[APPS_ITEMID] = bookObject1.id;
        books.push(bookObject1);
        CompletedBook.append(output1);
        updateDataToStorage();
    } else {
        const InCompletedBook = document.getElementById(InCompletedList);
        const output2 = MakeBook(BookTittle, BookAuthor, BookYear, false);
        output2[APPS_ITEMID] = bookObject2.id;
        books.push(bookObject2);
        InCompletedBook.append(output2);
        updateDataToStorage();
    }
};

//Membuat Buku
function MakeBook(BookTittle, BookYear, BookAuthor, BookIsCompleted) {
    const inputTittle = document.createElement("h3");
    inputTittle.innerText = BookTittle;

    const inputAuthor = document.createElement("h2");
    inputAuthor.innerText = BookAuthor;

    const inputYear = document.createElement("p");
    inputYear.innerText = BookYear;

    const container = document.createElement("article");
    container.classList.add("book_item")
    container.append(inputTittle, inputAuthor, inputYear);

    const btn = document.createElement("div");
    btn.classList.add("action")
    btn.append(container)

    if (BookIsCompleted) {
        btn.append(
            UndoBTN(),
            RemoveBTN()
        )
    } else {
        btn.append(
            ForwardBTN(),
            RemoveBTN()
        )
    }
    return btn;
}

//Membuat Tombol
function MakeButton(buttonTypeClass, eventListener, text) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = text;
    button.addEventListener("click", function(event) {
        eventListener(event)
    });
    return button;
};

function ForwardToCompleted(Completed) {
    const Titleinput = Completed.querySelector(".book_item > h3").innerText;
    const Authorinput = Completed.querySelector(".book_item > h2").innerText;
    const Yearinput = Completed.querySelector(".book_item > p").innerText;
    const MakeNewBook = MakeBook(Titleinput, Authorinput, Yearinput, true);

    const book = findBook(Completed[APPS_ITEMID]);
    book.BookIsCompleted = true;
    MakeNewBook[APPS_ITEMID] = book.id;

    const read = document.getElementById(CompletedList);
    read.append(MakeNewBook);
    Completed.remove();

    updateDataToStorage();
}

function UndoToUncompleted(Completed) {
    const inCompleted = document.getElementById(InCompletedList);
    const Titleinput = Completed.querySelector(".book_item > h3").innerText;
    const Authorinput = Completed.querySelector(".book_item > h2").innerText;
    const Yearinput = Completed.querySelector(".book_item > p").innerText;
    const MakeNewBook = MakeBook(Titleinput, Authorinput, Yearinput, true);

    const book = findBook(Completed[APPS_ITEMID]);
    book.BookIsCompleted = false;
    MakeNewBook[APPS_ITEMID] = book.id;

    inCompleted.append(MakeNewBook);
    Completed.remove();

    updateDataToStorage();
}

function remove(Completed) {

    const bookposition = findBookIndex(Completed[APPS_ITEMID]);
    books.splice(bookposition, 1);

    Completed.remove();
    updateDataToStorage();
}

//fungsi agar tombol berjalan
function ForwardBTN() {
    return MakeButton("green", function(event) {
        ForwardToCompleted(event.target.parentElement);
        alert("Buku Berhasil Dipindahkan");
    }, "Buku Selesai Dibaca")
};

function UndoBTN() {
    return MakeButton("green", function(event) {
        UndoToUncompleted(event.target.parentElement);
        alert("Buku Berhasil Dipindahkan");
    }, "Belum Selesai Dibaca")
};

function RemoveBTN() {
    return MakeButton("red", function(event) {
        remove(event.target.parentElement);
        alert("Buku Berhasil Dihapus")
    }, "Hapus Buku")
};