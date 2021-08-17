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
};
// ##### Eliminar Categoria #####
var deleteCategory = function (e) {
    var idToDelete = e.target.dataset.category; //id del elemento a eliminar
    //console.log(idToDelete,e.target)
    var storageAux = getStorage(); // Leo el local storage y me lo guardo en esta variable
    var categoryNameToDelete;
    // Recorro el local storage en búsqueda del elemento que tengo que eliminar
    for (var i = 0; i < storageAux.categories.length; i++) {
        if (storageAux.categories[i].id == idToDelete) {
            categoryNameToDelete = storageAux.categories[i].name; // guarda el nombre de la categoria a eliminar 
            storageAux.categories.splice(i, 1); // posicion y cuantos elementos elimino
            break;
        }
    }
    // elimina todas las operaciones relacionadas con las categorias
    var operations = storageAux.operations.filter(function (operation) {
        return operation.category !== categoryNameToDelete;
        //devuelve todas las operaciones que tengan una categoria diferente a la eliminada
        //operation guarda todas las operaciones NO eliminadas.
    });
    storageAux.operations = operations;
    localStorage.setItem("key-ahorradas", JSON.stringify(storageAux));
    addcategoryToList();
};
//{"categories":[{"id":1,"name":"comida"},{"id":2,"name":"vea"},{"id":3,"name":"hola"}],"operations":[{"id":1,"category":"vea","amount":"200","description":"peras","date":"2021-08-16","type":"Ganancia"},{"id":2,"category":"vea","amount":"200","description":"frutas","date":"2021-08-16","type":"Ganancia"},{"id":3,"category":"vea","amount":"3000","description":"verdura","date":"2021-08-16","type":"Ganancia"},{"id":4,"category":"comida","amount":"30","description":"nonooo","date":"2021-08-16","type":"Ganancia"}]}
//### agrega lista de categorias ###
var addcategoryToList = function () {
    categoriesList.innerHTML = " ";
    var storage = getStorage();
    for (var _i = 0, _a = storage.categories; _i < _a.length; _i++) {
        var category = _a[_i];
        var newCategoryLine = document.createElement("div");
        var p = createNode("p", { "class": "fs-5 badge p-2 text-dark text-wrap ms-3" }, document.createTextNode(category.name));
        var div = createNode("div", { "class": "col-9 align-items-center d-flex" }, p);
        var btnEdit = createNode("a", {
            "class": "btn me-3 edit-btn",
            href: "./editarCategoria.html?id=" + category.id + "&category=" + category.name
        }, document.createTextNode("Editar"));
        var btnDelete = createNode("button", {
            "class": "btn delete-btn",
            data: { category: category.id },
            type: "button"
        }, document.createTextNode("Eliminar"));
        var divTwo = createNode("div", { "class": "col-3 d-flex justify-content-end" }, btnEdit, btnDelete);
        var divContainer = createNode("div", { "class": "row mt-5 mb-5" }, div, divTwo);
        newCategoryLine.appendChild(divContainer);
        categoriesList.appendChild(newCategoryLine);
    }
    //RECORRE LOS BOTONES 
    var deleteBtn = document.querySelectorAll(".delete-btn");
    for (var i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener("click", deleteCategory);
    }
};
formAddCategory.addEventListener("submit", createCategory);
var init3 = function () {
    addcategoryToList();
};
init3();
