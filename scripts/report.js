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
    totales[date.getFullYear()][date.getMonth()][op.type] += Number(op.amount);
});
console.log(totales);
// let reportByCategory = {};
// operaciones.forEach((op) => {
// 	const category = op.category;
// 	const type = op.type
// 	if (!reportByCategory[category]) {
// 		reportByCategory[category] = 0;
// 	}
// 	if (!reportByCategory[category]) {
// 	reportByCategory[category] += Number(op.amount);
// });
// console.log(reportByCategory);
var reportByCategory = {};
operaciones.forEach(function (op) {
    //const category = op.category;
    var category = op.category, type = op.type, amount = op.amount;
    if (!reportByCategory[category]) {
        console.log(reportByCategory[category][type]);
        reportByCategory[category] = 0;
    }
    if (!reportByCategory[category]) {
        reportByCategory[category] += Number(amount);
    }
});
console.log(reportByCategory);
