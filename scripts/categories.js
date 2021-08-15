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
    // Recorro el local storage en búsqueda del elemento que tengo que eliminar
    for (var i = 0; i < storageAux.categories.length; i++) {
        if (storageAux.categories[i].id == idToDelete) {
            storageAux.categories.splice(i, 1); // posicion y cuantos elementos elimino
            break;
        }
    }
    localStorage.setItem("key-ahorradas", JSON.stringify(storageAux));
    addcategoryToList();
};
//### agrega lista de categorias ###
var addcategoryToList = function () {
    categoriesList.innerHTML = " ";
    var storage = getStorage();
    for (var _i = 0, _a = storage.categories; _i < _a.length; _i++) {
        var category = _a[_i];
        var newCategoryLine = document.createElement("div");
        var p = createNode("p", { "class": "fs-5" }, document.createTextNode(category.name));
        var div = createNode("div", { "class": "col-9 align-items-center d-flex" }, p);
        var btnEdit = createNode("a", {
            "class": "btn me-3 edit-btn",
            href: "./editarCategoria.html?id=" + category.id
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
    // const editBtn = document.querySelectorAll(".edit-btn");
    // for (let i = 0; i < editBtn.length; i++) {
    // 	// editBtn[i].addEventListener("click", editCategory);
    // }
};
formAddCategory.addEventListener("submit", createCategory);
var init3 = function () {
    addcategoryToList();
};
init3();
