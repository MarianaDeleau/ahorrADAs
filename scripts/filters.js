var loadSelect = function () {
    var storage = getStorage();
    var selectCategories = document.getElementById('categories');
    //console.log(selectCategories)
    //let selectCategoriesNuevaOp= document.getElementById('categories-nuevaOp')
    for (var _i = 0, _a = storage.categories; _i < _a.length; _i++) {
        var category = _a[_i];
        // selectCategories.innerHTML += `<option value="${category.id}">${category.name}</option>`
        var elem = document.createElement('option');
        elem.innerText = category.name;
        elem.value = category.name;
        selectCategories.appendChild(elem);
    }
};
//######### AGREGA LOS DIV DE LA OPERACIONES A LA LISTA #######
var operationsList = document.getElementById('operations');
var addOperationToList = function (array) {
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var operation = array_1[_i];
        if (operation.type === 'Gasto') {
            var h6 = createNode("h6", { "class": "text-center" }, document.createTextNode(operation.description));
            var divDescription = createNode("div", { "class": "col-md-3 d-flex align-items-center" }, h6);
            var badge = createNode("div", { "class": "badge bg-success p-2 text-white text-wrap", style: "width: 6rem" }, document.createTextNode(operation.category));
            var divCategory = createNode("div", { "class": "col-md-3 d-flex align-items-center" }, badge);
            var date = createNode("p", { "class": "text-end" }, document.createTextNode(operation.date));
            var divDate = createNode("div", { "class": "col-md-2 d-flex align-items-center justify-content-end" }, date);
            var amount = createNode("h6", { "class": "text-end", style: "color:red; font-weight:700" }, document.createTextNode((parseInt(operation.amount) * -1).toString()));
            var divAmount = createNode("div", { "class": "col-md-2 d-flex align-items-center justify-content-end" }, amount);
            var editLink = createNode("a", { "class": "text-end" }, document.createTextNode("Editar"));
            var deleteLink = createNode("a", { "class": "text-end" }, document.createTextNode("Eliminar"));
            var divLinks = createNode("div", { "class": "col-md-2 d-flex align-items-end flex-column justify-content-center" }, editLink, deleteLink);
            var newOperationLine = createNode("div", { "class": "row mt-3" }, divDescription, divCategory, divDate, divAmount, divLinks);
            operationsList.appendChild(newOperationLine);
        }
        else if (operation.type === 'Ganancia') {
            var h6 = createNode("h6", { "class": "text-center" }, document.createTextNode(operation.description));
            var divDescription = createNode("div", { "class": "col-md-3 d-flex align-items-center" }, h6);
            var badge = createNode("div", { "class": "badge bg-success p-2 text-white text-wrap", style: "width: 6rem" }, document.createTextNode(operation.category));
            var divCategory = createNode("div", { "class": "col-md-3 d-flex align-items-center" }, badge);
            var date = createNode("p", { "class": "text-end" }, document.createTextNode(operation.date));
            var divDate = createNode("div", { "class": "col-md-2 d-flex align-items-center justify-content-end" }, date);
            var amount = createNode("h6", { "class": "text-end", style: "color:green; font-weight:700" }, document.createTextNode(operation.amount));
            var divAmount = createNode("div", { "class": "col-md-2 d-flex align-items-center justify-content-end" }, amount);
            var editLink = createNode("a", { "class": "text-end" }, document.createTextNode("Editar"));
            var deleteLink = createNode("a", { "class": "text-end" }, document.createTextNode("Eliminar"));
            var divLinks = createNode("div", { "class": "col-md-2 d-flex align-items-end flex-column justify-content-center" }, editLink, deleteLink);
            var newOperationLine = createNode("div", { "class": "row mt-3" }, divDescription, divCategory, divDate, divAmount, divLinks);
            operationsList.appendChild(newOperationLine);
        }
    }
};
//######### INICIALIZA LA PAGINA #######
var init = function () {
    loadSelect();
};
init();
//######### FILTRA POR GASTO O GANANCIA #######
var typeOpFilter = function (type) {
    var storage = getStorage();
    var operationsType = storage.operations.filter(function (operation) { return operation.type === type; });
    balance(operationsType);
    return addOperationToList(operationsType);
};
//######### FILTRA POR CATEGORIA #######
var categoryOpFilter = function (Category) {
    var storage = getStorage();
    var operationsCategory = storage.operations.filter(function (operation) { return operation.category === Category; });
    balance(operationsCategory);
    return addOperationToList(operationsCategory);
};
//######### FUNCION PARA FILTROS GENERAL #######
var formFilters = document.getElementById('filtersForm');
var operationFilter = function () {
    operationsList.innerHTML = "";
    var typeFilter = document.getElementById('typeFilter');
    var categoryFilter = document.getElementById('categories');
    var type = typeFilter.value;
    var category = categoryFilter.value;
    if (type !== 'Todas') {
        typeOpFilter(type);
    }
    else if (category !== 'Todas') {
        categoryOpFilter(category);
    }
};
formFilters.addEventListener('change', operationFilter);
//######### FUNCION PARA ABRIR VENTANA #######
var openedWindow;
var btnNewOp = document.getElementById('btnNewOp');
var openWindow = function () {
    openedWindow = window.open('./nuevaOperacion.html');
};
btnNewOp.addEventListener("click", openWindow);
//######### FUNCION PARA BALANCE #######
var balanceGastos = 0;
var balanceGanancias = 0;
var res = 0;
var balance = function (operations) {
    var divGanancias = document.getElementById('balanceGanancias');
    var divGastos = document.getElementById('balanceGastos');
    var divTotal = document.getElementById('balanceTotal');
    divGastos.innerText = "$ 0";
    divGanancias.innerText = "$ 0";
    divTotal.innerText = "$ 0";
    for (var _i = 0, operations_1 = operations; _i < operations_1.length; _i++) {
        var operation = operations_1[_i];
        if (operation.type === 'Gasto') {
            balanceGastos = balanceGastos + parseInt(operation.amount);
            divGastos.innerText = "$ -" + balanceGastos;
        }
        else if (operation.type === 'Ganancia') {
            balanceGanancias = balanceGanancias + parseInt(operation.amount);
            divGanancias.innerText = "$ +" + balanceGanancias;
        }
        res = balanceGanancias - balanceGastos;
        divTotal.innerText = "$ " + res;
    }
    balanceGastos = 0;
    balanceGanancias = 0;
    res = 0;
};
