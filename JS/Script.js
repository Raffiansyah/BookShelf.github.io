document.addEventListener("DOMContentLoaded", function() {

    const submitForm = document.getElementById("inputBook");

    submitForm.addEventListener("submit", function(event) {
        event.preventDefault();
        AddBook();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }

});

document.addEventListener("ondatasaved", () => {
    console.log("Data Berhasil disimpan")
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromBook();
})