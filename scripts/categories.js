var formAddCategory = document.getElementById("form-add-category");
var categoriesList = document.getElementById("categoriesList");
var getIdCategory = function () {
    var storage = getStorage();
    if (storage.categories.length > 0) {
        var lastItem = storage.categories[storage.categories.length - 1];
        return lastItem.id + 1;
    }
    return 1;
};
var createCategory = function (e) {
    e.preventDefault();
    var form = e.target;
    var newCategoryName = form.nameCategory.value;
    var newCategory = {
        id: getIdCategory(),
        name: newCategoryName
    };
    var storageAux = getStorage();
    storageAux.categories.push(newCategory);
    localStorage.setItem("key-ahorradas", JSON.stringify(storageAux));
    addcategoryToList();
    //storage.categories.push(newCategory);
    //localStorage.setItem('key-ahorradas', JSON.stringify(storage));
};
var deleteCategory = function (e) {
    e.preventDefault();
    var idToDelete = e.srcElement.dataset.category; // Tenemos el id del elemento a eliminar
    var storageAux = getStorage(); // Leo el local storage y me lo guardo en esta variable
    // Recorro el local storage en búsqueda del elemento que tengo que eliminar
    for (var i = 0; i < storageAux.categories.length; i++) {
        if (storageAux.categories[i].id == idToDelete) {
            storageAux.categories.splice(i, 1); // posicion y cuantos elementos,
            break;
        }
    }
    localStorage.setItem("key-ahorradas", JSON.stringify(storageAux));
    addcategoryToList();
};
var addcategoryToList = function () {
    categoriesList.innerHTML = " ";
    var storage = getStorage();
    for (var _i = 0, _a = storage.categories; _i < _a.length; _i++) {
        var category = _a[_i];
        var newCategoryLine = document.createElement("div");
        newCategoryLine.innerHTML = "<div class=\"row mt-5 mb-5\">\n      <div class=\"col-9 align-items-center d-flex\">\n         <p class=\"fs-5\">" + category.name + "</p>\n      </div>\n      <div class=\"col-3 d-flex justify-content-end\">\n         <button class=\"btn me-3\" type=\"button\"><a class=\"text-white\" href=\"./editarCategoria.html\">Editar</a></button>\n         <button class=\"btn delete-btn\" data-category=" + category.id + ">Eliminar</button>\n      </div>\n      </div>";
        categoriesList.appendChild(newCategoryLine);
    }
    var deleteBtn = document.querySelectorAll(".delete-btn");
    for (var i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener("click", deleteCategory);
    }
};
var init3 = function () {
    addcategoryToList();
};
init3();
formAddCategory.addEventListener("submit", createCategory);
