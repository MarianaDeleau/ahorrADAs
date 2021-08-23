//####### VARIABLES #######
var _this = this;
var formOperation = document.getElementById('formNewOperation');
//####### SET DINAMIC ID FOR OPERATIONS / SETEAR ID DINAMICOS PARA OPERACIONES  #######
var getOperationId = function () {
    var storage = getStorage();
    if (storage.operations.length > 0) {
        var lastItem = storage.operations[storage.operations.length - 1];
        return lastItem.id + 1;
    }
    return 1;
};
//####### ADD OPERATIONS TO LOCAL STORAGE / AGREGAR OPERACIONES AL LOCAL STORAGE  #######
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
//######### ADD CATEGORYS TO SELECT IN NEW OPERATIONS /  AGREGA CATEGORIAS AL SELECT DE NUEVAS OPERACIONES #######
var categoryNewOperation = function () {
    var storage = getStorage();
    var selectCategoriesNuevaOp = document.getElementById('categoriesNuevaOp');
    for (var _i = 0, _a = storage.categories; _i < _a.length; _i++) {
        var category = _a[_i];
        var elem = document.createElement("option");
        elem.innerText = category.name;
        elem.value = category.name;
        selectCategoriesNuevaOp.appendChild(elem);
    }
};
//######### INITIALIZE HTML TO ADD ELEMENTS FROM STORAGE / INICIALIZA LA PAGINA PARA CARGAR DATOS DEL STORAGE#######
var init2 = function () {
    categoryNewOperation();
};
init2();
//######### CLOSE WINDOW AFTER ADDING OPERATIONS / FUNCION PARA CERRAR VENTANA LUEGO DE AGREGAR OPERACION #######
var closeOpenedWindow = function () {
    _this.close();
};
//######### CLOSE WINDOW CANCELING / FUNCION PARA CERRAR VENTANA CON CANCELAR #######
var cancelNewOp = function () {
    closeOpenedWindow();
};
var btnCancelOp = document.getElementById('btnCancelOp');
btnCancelOp.addEventListener("click", cancelNewOp);
