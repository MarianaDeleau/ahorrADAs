var getStorage = function () {
    var storageInfo = JSON.parse(localStorage.getItem('key-ahorradas'));
    if (!storageInfo) {
        storageInfo = {
            categories: [],
            operations: []
        };
    }
    return storageInfo;
};
//####### union todos los scripts ######
var formAddCategory = document.getElementById('form-add-category');
var storage = getStorage();
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
    storage.categories.push(newCategory);
    localStorage.setItem('key-ahorradas', JSON.stringify(storage));
};
formAddCategory.addEventListener('submit', createCategory);
var loadFields = function () {
    var storage = getStorage();
    var selectCategories = document.getElementById('categories');
    //console.log(selectCategories)
    //let selectCategoriesNuevaOp= document.getElementById('categories-nuevaOp')
    for (var _i = 0, _a = storage.categories; _i < _a.length; _i++) {
        var category = _a[_i];
        var elem = document.createElement('option');
        elem.innerText = category.name;
        elem.value = category.id.toString();
        selectCategories.appendChild(elem);
        //selectCategoriesNuevaOp.appendChild(elem)
    }
};
var init = function () {
    loadFields();
};
init();
var formOperation = document.getElementById('formNewOperation');
var getOperationId = function () {
    var storage = getStorage();
    if (storage.operations.length > 0) {
        var lastItem = storage.operations[storage.operations.length - 1];
        return lastItem.id + 1;
    }
    return 1;
};
var addOperation = function (e) {
    e.preventDefault();
    var form = e.target;
    var categoryOperation = form.categoryOp.value;
    var amountOperation = form.amountOp.value;
    var newOperationName = form.descriptionOp.value;
    var dateOperation = form.dateOp.value;
    var typeOperation = form.typeOp.value;
    // verificar
    var newOperation = {
        id: getOperationId(),
        category: categoryOperation,
        amount: amountOperation,
        description: newOperationName,
        date: dateOperation,
        type: typeOperation
    };
    storage.operations.push(newOperation);
    localStorage.setItem('key-ahorradas', JSON.stringify(storage));
};
formOperation.addEventListener("submit", addOperation);
