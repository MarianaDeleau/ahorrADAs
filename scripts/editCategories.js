// Input del usuario
var inputCategory = document.getElementById("editCategory");
// Boton para confirmar la edicion de la categoría
var btnEditCategory = document.getElementById("edit-btn2");
var btnCanceled = document.getElementById("canceled-btn");
// Busco en la url el id de la categoría que voy a editar.
var paramsUrl = new URLSearchParams(window.location.search);
var idUrl = paramsUrl.get("id");
var categoryUrl = paramsUrl.get("category");
inputCategory.value = categoryUrl;
//######### FUNCION PARA EDTAR CATEGORIAS DE LA VISTA Y DEL LOCAL STORAGE #######
var editCategories = function (e) {
    e.preventDefault();
    var input = inputCategory.value;
    if (input != "") {
        var storageAux = getStorage();
        for (var i = 0; i < storageAux.categories.length; i++) {
            if (storageAux.categories[i].id.toString() == idUrl) {
                storageAux.categories[i].name = input;
                break;
            }
        }
        storageAux.operations.forEach(function (operation) {
            if (operation.category.toString() === categoryUrl) {
                operation.category = input;
            }
        });
        localStorage.setItem("key-ahorradas", JSON.stringify(storageAux));
        window.location.href = "categorias.html";
    }
};
btnEditCategory.addEventListener("click", editCategories);
var canceled = function () {
    window.location.href = "categorias.html";
};
btnCanceled.addEventListener("click", canceled);
