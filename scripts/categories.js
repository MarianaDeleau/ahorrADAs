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
        name: newCategoryName
    };
    storage.categories.push(newCategory);
    localStorage.setItem('key-ahorradas', JSON.stringify(storage));
};
formAddCategory.addEventListener('submit', createCategory);
