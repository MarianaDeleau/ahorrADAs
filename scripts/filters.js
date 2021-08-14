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
        var newOperationLine = document.createElement('div');
        newOperationLine.classList.add('row', 'mt-3');
        newOperationLine.innerHTML = "<div class=\"col-md-3 d-flex align-items-center \">\n        <h6>" + operation.description + "</h6>\n        </div>\n        <div class=\"col-md-3 d-flex align-items-center\">\n        <div class=\"badge bg-success p-2 text-white text-wrap\" style=\"width: 6rem;\">\n        " + operation.category + "\n        </div>\n        </div>\n        <div class=\"col-md-2 d-flex align-items-center justify-content-end\">\n        <p class=\"text-end\">" + operation.date + "</p>\n        </div>\n        <div class=\"col-md-2 d-flex align-items-center justify-content-end\">\n        <h6 class=\"text-end\">" + operation.amount + "</h6>\n        </div>\n        <div class=\"col-md-2 d-flex align-items-end flex-column justify-content-center\">\n        <a href=\"\" class=\"text-end\">Editar</a>\n        <a href=\"\" class=\"text-end\">Eliminar</a>\n        </div>";
        operationsList.appendChild(newOperationLine);
    }
};
var init = function () {
    loadSelect();
};
init();
//######### FILTRA POR GASTO O GANANCIA #######
var typeOpFilter = function (type) {
    var storage = getStorage();
    var operationsType = storage.operations.filter(function (operation) { return operation.type === type; });
    return addOperationToList(operationsType);
};
//######### FILTRA POR CATEGORIA #######
var categoryOpFilter = function (Category) {
    var storage = getStorage();
    var operationsCategory = storage.operations.filter(function (operation) { return operation.category === Category; });
    return addOperationToList(operationsCategory);
};
//######### FUNCION PARA FILTROS GENERAL #######
var formFilters = document.getElementById('filtersForm');
var operationFilter = function () {
    var typeFilter = document.getElementById('typeFilter');
    var categoryFilter = document.getElementById('categories');
    var type = typeFilter.value;
    var category = categoryFilter.value;
    if (type !== 'Todas') {
        console.log(typeOpFilter(type));
    }
    else if (category !== 'Todas') {
        console.log(categoryOpFilter(category));
    }
};
formFilters.addEventListener('change', operationFilter);
//filtro de fecha
var dateOperationFilter = document.getElementById("dateOperationFilter");
var operationsDate = function (e) {
    var storage = getStorage();
    var date = new Date(e.target.value);
    console.log(date.getTime());
    var storageFilter = storage.operations.filter(function (op) {
        var opDate = new Date(op.date);
        console.log(opDate);
        return date < opDate;
    });
    console.log(storageFilter);
};
dateOperationFilter.addEventListener("change", operationsDate);
// let searchDate = storage.operations.filter(op => op.date == dateOperationFilter.value
// }
// dateOperationFilter.addEventListener(`onChange`, () => {
//   console.log(`++++date++++`)
//   operationsDate()
// });
// Aquí necesitamos filtrar por la fecha, indicando que solo nos muestre aquellas que sean mayores a "10-18-2018"
// Como puedes observar hago n.date es n la var que uso para acceder a la clave date y hacer mi comparación
// let busca = accounts.filter(n => n.date == "10-18-2018")
// array.sort(function(a, b) {
//     a = new Date(a.dateModified);
//     b = new Date(b.dateModified);
//     return a>b ? -1 : a<b ? 1 : 0;
// });
// Esto ordena las fechas de las más recientes.
