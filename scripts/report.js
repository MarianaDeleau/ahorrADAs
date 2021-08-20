var storage = getStorage();
var operaciones = storage.operations;
//###### RESUMEN GENERAL ######
var report = {};
operaciones.forEach(function (op) {
    var date = new Date(op.date);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (!report[year]) {
        report[year] = {};
    }
    if (!report[year][month]) {
        report[year][month] = {};
    }
    if (!report[year][month][op.category]) {
        report[year][month][op.category] = {};
    }
    if (!report[year][month][op.category][op.type]) {
        report[year][month][op.category][op.type] = 0;
    }
    report[year][month][op.category][op.type] += Number(op.amount);
    return report;
});
console.log(report);
//###### RESUMEN POR CATEGORIA ######
var reportByCategory = {};
operaciones.forEach(function (op) {
    if (!reportByCategory[op.category]) {
        reportByCategory[op.category] = {};
    }
    if (!reportByCategory[op.category][op.type]) {
        reportByCategory[op.category][op.type] = 0;
    }
    reportByCategory[op.category][op.type] += Number(op.amount);
    return reportByCategory;
});
console.log(reportByCategory);
//###### VISTA RESUMEN POR CATEGORIA ######
var addReportByCategoryToList = function (object) {
    var totalsByCategory = document.getElementById('totalsByCategoryDiv');
    for (var prop in object) {
        var categoryTag = createNode('p', { "class": "fs-5 badge p-1 text-dark text-wrap ms-3" }, document.createTextNode(prop));
        var divP = createNode('div', { "class": "col-md-3" }, categoryTag);
        if (object[prop].Ganancia) {
            var ganancia = createNode('div', { "class": "col-md-3 fs-5 text-end text-success" }, document.createTextNode("$ " + Number(object[prop].Ganancia)));
        }
        else {
            var ganancia = createNode('div', { "class": "col-md-3 fs-5 text-end text-success" }, document.createTextNode("$ " + (object[prop].Ganancia = 0)));
        }
        if (object[prop].Gasto) {
            var gasto = createNode('div', { "class": "col-md-3 fs-5 text-end text-danger" }, document.createTextNode("$ " + Number(object[prop].Gasto)));
        }
        else {
            var gasto = createNode('div', { "class": "col-md-3 fs-5 text-end text-danger" }, document.createTextNode("$ " + (object[prop].Gasto = 0)));
        }
        var balance = createNode('div', { "class": "col-md-3 fs-5 text-end" }, document.createTextNode("$ " + (Number(object[prop].Ganancia) - Number(object[prop].Gasto))));
        var row = createNode('div', { "class": "row mb-4" }, divP, ganancia, gasto, balance);
        totalsByCategory.appendChild(row);
    }
};
addReportByCategoryToList(reportByCategory);
//###### FUNCION RESUMEN POR MES ######
var reportByMonth = {};
operaciones.forEach(function (op) {
    var date = new Date(op.date);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (!reportByMonth[year]) {
        reportByMonth[year] = {};
    }
    if (!reportByMonth[year][month]) {
        reportByMonth[year][month] = {};
    }
    if (!reportByMonth[year][month][op.type]) {
        reportByMonth[year][month][op.type] = 0;
    }
    reportByMonth[year][month][op.type] += Number(op.amount);
    return reportByMonth;
});
console.log(reportByMonth);
var addReportByMonthToList = function (object) {
    var totalsByMonth = document.getElementById('totalsByMonthDiv');
    for (var prop in object) {
        for (var i in object[prop]) {
            var month = createNode('div', { "class": "col-md-3 fs-5 text-start ps-4" }, document.createTextNode(i + "/" + prop));
            var isProfit = object[prop][i].Ganancia && object[prop][i].Ganancia >= 0;
            var isExpense = object[prop][i].Gasto && object[prop][i].Gasto >= 0;
            var profit = isProfit ? object[prop][i].Ganancia : 0;
            var expense = isExpense ? object[prop][i].Gasto : 0;
            var ganancia = createNode('div', { "class": "col-md-3 fs-5 text-end text-success" }, document.createTextNode("$ " + profit));
            var gasto = createNode('div', { "class": "col-md-3 fs-5 text-end text-danger" }, document.createTextNode("$ " + expense * -1));
            var balance = createNode('div', { "class": "col-md-3 fs-5 text-end" }, document.createTextNode("$ " + (profit - expense)));
            var row = createNode('div', { "class": "row mb-4" }, month, ganancia, gasto, balance);
            totalsByMonth.appendChild(row);
        }
    }
};
addReportByMonthToList(reportByMonth);
//###### FUNCION PARA CREAR LAS FILAS CON LOS RESUMENES POR MES ######
// const totalsByMonth = document.getElementById('totalsByMonthDiv')
// const createMonthReportLine = (obj) => {
// 		for (const op in obj) {
// 			const month = createNode('div', { class: "col-md-3 fs-5 text-start ps-4" }, document.createTextNode(DATO));
// 			const ganancia = createNode('div', { class: "col-md-3 fs-5 text-end text-success" }, document.createTextNode(DATO));
// 			const gasto = createNode('div', { class: "col-md-3 fs-5 text-end text-danger" }, document.createTextNode(DATO));
// 			const balance = createNode('div', { class: "col-md-3 fs-5 text-end" }, document.createTextNode(DATO));
// 			const row = createNode('div', { class: "row mb-3" }, month, ganancia, gasto, balance);
// 			totalsByMonth.appendChild(row)
// 		}
// }
// createMonthReportLine(reportByMonth)
