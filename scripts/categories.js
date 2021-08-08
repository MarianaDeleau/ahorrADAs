var formAddCategory = document.getElementById('form-add-category');
var categoriesList = document.getElementById('categoriesList');
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
    localStorage.setItem('key-ahorradas', JSON.stringify(storageAux));
    addcategoryToList(newCategory.name);
    //storage.categories.push(newCategory);
    //localStorage.setItem('key-ahorradas', JSON.stringify(storage));
};
formAddCategory.addEventListener('submit', createCategory);
var addcategoryToList = function (name) {
    var newCategoryLine = document.createElement('div');
    newCategoryLine.innerHTML = "<div class=\"row mt-5 mb-5\">\n   <div class=\"col-9 align-items-center d-flex\">\n      <p class=\"fs-5\">" + name + "</p>\n   </div>\n   <div class=\"col-3 d-flex justify-content-end\">\n      <button class=\"btn me-3\" type=\"button\"><a class=\"text-white\" href=\"./editarCategoria.html\">Editar</a></button>\n      <button class=\"btn\">Eliminar</button>\n   </div>\n   </div>";
    categoriesList.appendChild(newCategoryLine);
};
