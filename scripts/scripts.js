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
var storage = getStorage();
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
var init = function () {
    loadFields();
};
init();
