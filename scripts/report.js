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
//###### FUNCION PARA CREAR LAS FILAS CON LOS RESUMENES POR CATEGORIA ######
// const totalsByCategory = document.getElementById('totalsByCategoryDiv')
// const createCategoryReportLine = (obj) => {
// 		for (const op in obj) {
// 			const categoryTag = createNode('p', { class: "fs-5 badge p-1 text-dark text-wrap ms-3" }, document.createTextNode(DATO));
// 			const divP = createNode('div', { class: "col-md-3" }, categoryTag);
// 			const ganancia = createNode('div', { class: "col-md-3 fs-5 text-end text-success" }, document.createTextNode(DATO));
// 			const gasto = createNode('div', { class: "col-md-3 fs-5 text-end text-danger" }, document.createTextNode(DATO));
// 			const balance = createNode('div', { class: "col-md-3 fs-5 text-end" }, document.createTextNode(DATO));
// 			const row = createNode('div', { class: "row mb-4" }, divP, ganancia, gasto, balance);
// 			totalsByCategory.appendChild(row)
// 		}
// }
// createCategoryReportLine(reportByCategory)
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
//###### FUNCION PARA CREAR LAS FILAS CON LOS RESUMENES POR MES ######
// const totalsByMonth = document.getElementById('totalsByMonthDiv')
// const createMonthReportLine = (obj) => {
// 		for (const op in obj) {
// 			const month = createNode('div', { class: "col-md-3 fs-5 text-start ps-4" }, document.createTextNode(DATO));
// 			const ganancia = createNode('div', { class: "col-md-3 fs-5 text-end text-success" }, document.createTextNode(DATO));
// 			const gasto = createNode('div', { class: "col-md-3 fs-5 text-end text-danger" }, document.createTextNode(DATO));
// 			const balance = createNode('div', { class: "col-md-3 fs-5 text-end" }, document.createTextNode(DATO));
// 			const row = createNode('div', { class: "row mb-3" }, month, ganancia, gasto, balance);
// 			totalsByCategory.appendChild(row)
// 		}
// }
// createMonthReportLine(reportByMonth)
