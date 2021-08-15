//#### section editar categoria ####
// Selectores
// Input del usuario
var inputCategory = document.getElementById("editCategory");
// Boton para confirmar la edicion de la categoría
var btnEditCategory = document.getElementById("edit-btn2");
var btnCanceled = document.getElementById("canceled-btn");
// Busco en la url el id de la categoría que voy a editar.
var paramsUrl = new URLSearchParams(window.location.search);
var idUrl = parseInt(paramsUrl.get("id"));
var editCategories = function (e) {
    e.preventDefault();
    var input = inputCategory.value;
    if (input != "") {
        var storageAux = getStorage();
        for (var i = 0; i < storageAux.categories.length; i++) {
            if (storageAux.categories[i].id == idUrl) {
                storageAux.categories[i].name = input;
                break;
            }
        }
        localStorage.setItem("key-ahorradas", JSON.stringify(storageAux));
        window.location.href = "categorias.html";
    }
};
btnEditCategory.addEventListener("click", editCategories);
var canceled = function () {
    window.location.href = "categorias.html";
};
btnCanceled.addEventListener("click", canceled);
