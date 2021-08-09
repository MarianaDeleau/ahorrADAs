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
    var categoryOperation = form.categoryOp.value; /*chequear q tome del LS*/
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
    var storageAux = getStorage();
    storageAux.operations.push(newOperation);
    localStorage.setItem('key-ahorradas', JSON.stringify(storageAux));
};
formOperation.addEventListener("submit", addOperation);
var categoryNewOperation = function () {
    var storage = getStorage();
    var selectCategoriesNuevaOp = document.getElementById("categories-nuevaOp");
    for (var _i = 0, _a = storage.categories; _i < _a.length; _i++) {
        var category = _a[_i];
        // selectCategories.innerHTML += `<option value="${category.id}">${category.name}</option>`
        var elem = document.createElement("option");
        elem.innerText = category.name;
        elem.value = category.id.toString();
        selectCategoriesNuevaOp.appendChild(elem);
    }
};
var init2 = function () {
    categoryNewOperation();
};
init2();
