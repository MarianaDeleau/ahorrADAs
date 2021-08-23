//##### EDIR OPERATIONS FUNCTION / FUNCION PARA EDITAR OPERACIONES #####
// ####### VARIABLES #######
// boton a de filters creado por nodos
var btnEditOperation = document.getElementById("editLink");
//inputs editar operacion 
var inputDescription = document.getElementById("descriptionEditOp");
var inputAmount = document.getElementById('amountEditOp');
var inputType = document.getElementById('typeEditOp');
var inputCategory = document.getElementById('categoriesEditOp');
var inputDate = document.getElementById('dateEditOp');
//botones de editarOperacion.html
var btnCanceledEdit = document.getElementById("btnCancelEditOp");
var btnAddEditOp = document.getElementById("btnAddEditOp");
//search URL params
var paramsUrl = new URLSearchParams(window.location.search);
var idUrl = parseInt(paramsUrl.get("id"));
var descriptionUrl = paramsUrl.get("description");
var amountUrl = paramsUrl.get("amount");
var typeUrl = paramsUrl.get("type");
var categoryUrl = paramsUrl.get("category");
var dateUrl = paramsUrl.get("date");
inputDescription.value = descriptionUrl;
inputAmount.value = amountUrl;
inputType.value = typeUrl;
inputCategory.value = categoryUrl;
inputDate.value = dateUrl;
// edit function
var editOperations = function (e) {
    e.preventDefault();
    var editDescription = inputDescription.value;
    var editAmount = inputAmount.value;
    var editType = inputType.value;
    var editCategory = inputCategory.value;
    var editDate = inputDate.value;
    if (editDescription != "") {
        var storageAux = getStorage();
        for (var i = 0; i < storageAux.operations.length; i++) {
            if (storageAux.operations[i].id == idUrl) {
                storageAux.operations[i].description = editDescription;
                storageAux.operations[i].amount = editAmount;
                storageAux.operations[i].type = editType;
                storageAux.operations[i].category = editCategory;
                storageAux.operations[i].date = editDate;
                break;
            }
        }
        localStorage.setItem("key-ahorradas", JSON.stringify(storageAux));
        window.location.href = "index.html";
    }
};
btnAddEditOp.addEventListener("click", editOperations);
//######### CLOSE WINDOW CANCELING / FUNCION PARA CERRAR VENTANA CON CANCELAR #######
var canceled = function () {
    window.location.href = "index.html";
};
btnCanceledEdit.addEventListener("click", canceled);
//######### ADD CATEGORIES TO SELECT EDIT OPERATIONS / AGREGA CATEGORIAS AL SELECT DE EDITAR OPERACIONES #######
var categoryEditOperation = function () {
    var storage = getStorage();
    var selectCategoriesNuevaOp = document.getElementById('categoriesEditOp');
    for (var _i = 0, _a = storage.categories; _i < _a.length; _i++) {
        var category = _a[_i];
        var elem = document.createElement("option");
        elem.innerText = category.name;
        elem.value = category.name;
        selectCategoriesNuevaOp.appendChild(elem);
    }
};
//######### INITIALIZE HTML TO ADD ELEMENTS FROM STORAGE / INICIALIZA LA PAGINA PARA CARGAR DATOS DEL STORAGE#######
var init4 = function () {
    categoryEditOperation();
};
init4();
