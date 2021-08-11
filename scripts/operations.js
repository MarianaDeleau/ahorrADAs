var _this = this;
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
    var categoryOperation = form.categoriesNuevaOp.value; /*chequear q tome del LS*/
    var amountOperation = form.amountOp.value;
    var newOperationName = form.descriptionOp.value;
    var dateOperation = form.dateOp.value;
    var typeOperation = form.typeOp.value;
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
    closeOpenedWindow();
};
formOperation.addEventListener("submit", addOperation);
var categoryNewOperation = function () {
    var storage = getStorage();
    var selectCategoriesNuevaOp = document.getElementById('categoriesNuevaOp');
    for (var _i = 0, _a = storage.categories; _i < _a.length; _i++) {
        var category = _a[_i];
        // selectCategories.innerHTML += `<option value="${category.id}">${category.name}</option>`
        var elem = document.createElement("option");
        elem.innerText = category.name;
        elem.value = category.name;
        selectCategoriesNuevaOp.appendChild(elem);
    }
};
var init2 = function () {
    categoryNewOperation();
};
init2();
//######### FUNCION PARA CERRAR VENTANA LUEGO DE AGREGAR OPERACION #######
var closeOpenedWindow = function () {
    _this.close();
};
//######### FUNCION PARA CERRAR VENTANA COON CANCELAR #######
var cancelNewOp = function () {
    closeOpenedWindow();
};
var btnCancelOp = document.getElementById('btnCancelOp');
btnCancelOp.addEventListener("click", cancelNewOp);
