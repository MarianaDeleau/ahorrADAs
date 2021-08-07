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
    var categoryOperation = form.categoryOp.value; /*chequear q tome del LS*/
    var amountOperation = form.amountOp.value;
    var newOperationName = form.descriptionOp.value;
    var dateOperation = form.dateOp.value;
    var typeOperation = form.typeOp.value;
    // verificar
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
};
formOperation.addEventListener("submit", addOperation);
