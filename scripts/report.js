var storage = getStorage();
var operaciones = storage.operations;
var totales = {};
operaciones.forEach(function (op) {
    var date = new Date(op.date);
    if (!totales[date.getFullYear()]) {
        totales[date.getFullYear()] = {};
    }
    if (!totales[date.getFullYear()][date.getMonth()]) {
        totales[date.getFullYear()][date.getMonth()] = {};
    }
    if (!totales[date.getFullYear()][date.getMonth()][op.type]) {
        totales[date.getFullYear()][date.getMonth()][op.type] = 0;
    }
    totales[date.getFullYear()][date.getMonth()][op.type] += op.amount;
});
console.log(totales);
