var loadFields = function () {
    var storage = getStorage();
    var selectCategories = document.getElementById('categories');
    //console.log(selectCategories)
    //let selectCategoriesNuevaOp= document.getElementById('categories-nuevaOp')
    for (var _i = 0, _a = storage.categories; _i < _a.length; _i++) {
        var category = _a[_i];
        // selectCategories.innerHTML += `<option value="${category.id}">${category.name}</option>`
        var elem = document.createElement('option');
        elem.innerText = category.name;
        elem.value = category.id.toString();
        selectCategories.appendChild(elem);
    }
};
var operationsList = document.getElementById('operations');
var addOperationToList = function () {
    var storage = getStorage();
    for (var _i = 0, _a = storage.operations; _i < _a.length; _i++) {
        var operation = _a[_i];
        var newOperationLine = document.createElement('div');
        newOperationLine.classList.add('row', 'mt-3');
        newOperationLine.innerHTML = "<div class=\"col-md-3 d-flex align-items-center \">\n        <h6>" + operation.description + "</h6>\n        </div>\n        <div class=\"col-md-3 d-flex align-items-center\">\n        <div class=\"badge bg-success p-2 text-white text-wrap\" style=\"width: 6rem;\">\n        " + operation.category + "\n        </div>\n        </div>\n        <div class=\"col-md-2 d-flex align-items-center justify-content-end\">\n        <p class=\"text-end\">" + operation.date + "</p>\n        </div>\n        <div class=\"col-md-2 d-flex align-items-center justify-content-end\">\n        <h6 class=\"text-end\">" + operation.amount + "</h6>\n        </div>\n        <div class=\"col-md-2 d-flex align-items-end flex-column justify-content-center\">\n        <a href=\"\" class=\"text-end\">Editar</a>\n        <a href=\"\" class=\"text-end\">Eliminar</a>\n        </div>";
        operationsList.appendChild(newOperationLine);
    }
};
var init = function () {
    loadFields();
    addOperationToList();
};
init();
