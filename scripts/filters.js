//######### AGREGA CATEGORIAS AL SELECT DE FILTROS #######
var loadSelect = function () {
    var storage = getStorage();
    var selectCategories = document.getElementById("categories");
    //console.log(selectCategories)
    //let selectCategoriesNuevaOp= document.getElementById('categories-nuevaOp')
    for (var _i = 0, _a = storage.categories; _i < _a.length; _i++) {
        var category = _a[_i];
        var elem = document.createElement("option");
        elem.innerText = category.name;
        elem.value = category.name;
        selectCategories.appendChild(elem);
    }
};
//######### INICIALIZA LA PAGINA PARA CARGAR DATOS DEL STORAGE #######
var init = function () {
    loadSelect();
};
init();
//######### AGREGA LOS DIV DE LA OPERACIONES A LA LISTA #######
var operationsList = document.getElementById("operations");
var addOperationToList = function (array) {
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var operation = array_1[_i];
        if (operation.type === "Gasto") {
            var h6 = createNode("h6", { "class": "text-center" }, document.createTextNode(operation.description));
            var divDescription = createNode("div", { "class": "col-md-3 d-flex align-items-center" }, h6);
            var badge = createNode("div", { "class": "badge p-2 text-dark text-wrap", style: "width: 6rem" }, document.createTextNode(operation.category));
            var divCategory = createNode('div', { "class": "col-md-3 d-flex align-items-center" }, badge);
            var date = createNode("p", { "class": "text-end" }, document.createTextNode(operation.date));
            var divDate = createNode("div", { "class": "col-md-2 d-flex align-items-center justify-content-end" }, date);
            var amount = createNode("h6", { "class": "text-end", style: "color:red; font-weight:800" }, document.createTextNode("-" + operation.amount)); //document.createTextNode((parseInt(operation.amount) * -1).toString()));
            var divAmount = createNode("div", { "class": "col-md-2 d-flex align-items-center justify-content-end" }, amount);
            var editLink = createNode("a", { "class": "text-end editLink", data: { operation: operation.id }, href: "./editarOperacion.html?id=" + operation.id + "&description=" + operation.description + "&amount=" + operation.amount + "&type=" + operation.type + "&category=" + operation.category + "&date=" + operation.date }, document.createTextNode("Editar"));
            var deleteLink_1 = createNode("a", { "class": "text-end deleteLink", data: { operation: operation.id } }, document.createTextNode("Eliminar"));
            var divLinks = createNode("div", { "class": "col-md-2 d-flex align-items-end flex-column justify-content-center" }, editLink, deleteLink_1);
            var newOperationLine = createNode("div", { "class": "row mt-3" }, divDescription, divCategory, divDate, divAmount, divLinks);
            operationsList.appendChild(newOperationLine);
        }
        else if (operation.type === "Ganancia") {
            var h6 = createNode("h6", { "class": "text-center" }, document.createTextNode(operation.description));
            var divDescription = createNode("div", { "class": "col-md-3 d-flex align-items-center" }, h6);
            var badge = createNode("div", { "class": "badge p-2 text-dark text-wrap", style: "width: 6rem" }, document.createTextNode(operation.category));
            var divCategory = createNode("div", { "class": "col-md-3 d-flex align-items-center" }, badge);
            var date = createNode("p", { "class": "text-end" }, document.createTextNode(operation.date));
            var divDate = createNode("div", { "class": "col-md-2 d-flex align-items-center justify-content-end" }, date);
            var amount = createNode("h6", { "class": "text-end", style: "color:green; font-weight:800" }, document.createTextNode(operation.amount));
            var divAmount = createNode("div", { "class": "col-md-2 d-flex align-items-center justify-content-end" }, amount);
            var editLink = createNode("a", { "class": "text-end editLink", data: { operation: operation.id }, href: "./editarOperacion.html?id=" + operation.id + "&description=" + operation.description + "&amount=" + operation.amount + "&type=" + operation.type + "&category=" + operation.category + "&date=" + operation.date }, document.createTextNode("Editar"));
            var deleteLink_2 = createNode("a", { "class": "text-end deleteLink", data: { operation: operation.id } }, document.createTextNode("Eliminar"));
            var divLinks = createNode("div", { "class": "col-md-2 d-flex align-items-end flex-column justify-content-center" }, editLink, deleteLink_2);
            var newOperationLine = createNode("div", { "class": "row mt-3" }, divDescription, divCategory, divDate, divAmount, divLinks);
            operationsList.appendChild(newOperationLine);
        }
    }
    //RECORRE LOS BOTONES
    var deleteLink = document.querySelectorAll(".deleteLink");
    for (var i = 0; i < deleteLink.length; i++) {
        deleteLink[i].addEventListener("click", deleteOperation);
    }
};
//######### FILTRA POR GASTO O GANANCIA #######
var typeOpFilter = function (operationsArray, filterType) {
    if (filterType !== "Todas")
        return operationsArray.filter(function (operation) { return operation.type === filterType; });
    return operationsArray;
};
//######### FILTRA POR CATEGORIA #######
var categoryOpFilter = function (operationsArray, category) {
    if (category !== "Todas")
        return operationsArray.filter(function (operation) { return operation.category === category; });
    return operationsArray;
};
//######### FILTRA POR FECHA #######
var operationsDate = function (operationsArray, date) {
    return operationsArray.filter(function (op) {
        return date <= new Date(op.date);
    });
};
//######### FILTRO ORDENAR #######
var sortDate = function (op1, op2) {
    if (op1.date > op2.date) {
        return 1;
    }
    if (op1.date < op2.date) {
        return -1;
    }
    // a must be equal to b
    return 0;
};
var sortAmount = function (op1, op2) {
    var numberA = op1.type === 'Ganancia' ? Number(op1.amount) : (Number(op1.amount) * -1);
    var numberB = op2.type === 'Ganancia' ? Number(op2.amount) : (Number(op2.amount) * -1);
    return numberA - numberB;
};
var sortAZ = function (op1, op2) {
    if (op1.description > op2.description) {
        return 1;
    }
    if (op1.description < op2.description) {
        return -1;
    }
    // a must be equal to b
    return 0;
};
var operationsSort = function (operationsArray, sortType) {
    switch (sortType) {
        case "sortDateAsc":
            return operationsArray.sort(function (op1, op2) { return sortDate(op1, op2); });
        case "sortDateDesc":
            return operationsArray.sort(function (op1, op2) { return sortDate(op2, op1); });
        case "sortAmountAsc":
            return operationsArray.sort(function (op1, op2) { return sortAmount(op1, op2); });
        case "sortAmountDesc":
            return operationsArray.sort(function (op1, op2) { return sortAmount(op2, op1); });
        case "sortAZ":
            return operationsArray.sort(function (op1, op2) { return sortAZ(op1, op2); });
        case "sortZA":
            return operationsArray.sort(function (op1, op2) { return sortAZ(op2, op1); });
        default:
            return operationsArray;
    }
};
//######### FUNCION PARA FILTROS GENERAL #######
var formFilters = document.getElementById("filtersForm");
var divNoOps = document.getElementById("noOperations");
var divWithOps = document.getElementById("operationsListHeader");
var operationFilter = function (event) {
    divNoOps.style.display = "none";
    divWithOps.style.display = "block";
    operationsList.innerHTML = "";
    // Operations list
    var storage = getStorage();
    var operationsArray = storage.operations;
    var typeFilter = document.getElementById("typeFilter");
    var type = typeFilter.value;
    operationsArray = typeOpFilter(operationsArray, type);
    var categoryFilter = document.getElementById("categories");
    var category = categoryFilter.value;
    operationsArray = categoryOpFilter(operationsArray, category);
    var dateOperationFilter = document.getElementById("dateOperationFilter");
    if (dateOperationFilter.value !== "") {
        var date = new Date(dateOperationFilter.value);
        operationsArray = operationsDate(operationsArray, date);
    }
    var sortFilter = document.getElementById("sortFilter");
    var sortType = sortFilter.value;
    operationsArray = operationsSort(operationsArray, sortType);
    console.log(sortType);
    balance(operationsArray);
    return addOperationToList(operationsArray);
};
formFilters.addEventListener("change", operationFilter);
//######### FUNCION PARA ELIMINAR OPERACIONES #######
var deleteLink = document.querySelectorAll(".deleteLink");
var deleteOperation = function (e) {
    var idToDelete = e.target.dataset.operation; //id del elemento a eliminar
    var storageAux = getStorage(); // Leo el local storage y me lo guardo en esta variable
    // Recorro el local storage en búsqueda del elemento que tengo que eliminar
    for (var i = 0; i < storageAux.operations.length; i++) {
        if (storageAux.operations[i].id == idToDelete) {
            storageAux.operations.splice(i, 1); // posicion y cuantos elementos elimino
            break;
        }
    }
    localStorage.setItem("key-ahorradas", JSON.stringify(storageAux));
    //addOperationToList();
    operationFilter();
};
//######### FUNCION PARA ABRIR VENTANA NUEVA OPERACION #######
var openedWindow;
var btnNewOp = document.getElementById("btnNewOp");
var openWindow = function () {
    openedWindow = window.open("./nuevaOperacion.html");
};
btnNewOp.addEventListener("click", openWindow);
//######### FUNCION PARA BALANCE #######
var balanceGastos = 0;
var balanceGanancias = 0;
var res = 0;
var balance = function (operations) {
    var divGanancias = document.getElementById("balanceGanancias");
    var divGastos = document.getElementById("balanceGastos");
    var divTotal = document.getElementById("balanceTotal");
    divGastos.innerText = "$ 0";
    divGanancias.innerText = "$ 0";
    divTotal.innerText = "$ 0";
    for (var _i = 0, operations_1 = operations; _i < operations_1.length; _i++) {
        var operation = operations_1[_i];
        if (operation.type === "Gasto") {
            balanceGastos = balanceGastos + parseInt(operation.amount);
            divGastos.innerText = "$ -" + balanceGastos;
        }
        else if (operation.type === "Ganancia") {
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
//######### TOGGLE FILTROS #######
var toggleLink = document.getElementById('toggle-filtros');
var hideFilters = document.getElementById('hideFilters');
var displayFilters = document.getElementById('displayFilters');
var headerFilters = document.getElementById('headerFilters');
var toggleFilters = function () {
    formFilters.classList.toggle('dnone');
    hideFilters.classList.toggle('dnone');
    displayFilters.classList.toggle('dnone');
    headerFilters.classList.toggle('mb-4');
};
toggleLink.addEventListener('click', toggleFilters);
