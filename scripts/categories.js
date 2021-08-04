var formAddCategory = document.getElementById('form-add-category');
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
        name: newCategoryName,
        slug: slugify(newCategoryName)
    };
    storage.categories.push(newCategory);
    localStorage.setItem('todo-storage', JSON.stringify(storage));
};
formAddCategory.addEventListener('submit', createCategory);
var loadFields = function () {
    var storage = getStorage();
    var selectCategories = document.getElementById('categories');
    for (var _i = 0, _a = storage.categories; _i < _a.length; _i++) {
        var category = _a[_i];
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
