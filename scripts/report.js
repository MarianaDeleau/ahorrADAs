var storage = getStorage();
var operaciones = storage.operations;
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
//###### VISTA RESUMEN POR MES ######
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
//###### VISTA RESUMEN GENERAL ######
//Categoría con mayor ganancia
var higherCategory = function (object) {
    var max = 0;
    var category = " ";
    var categoryBadge = document.getElementById('higherGainByCategoryBadge');
    var higherGain = document.getElementById('higherGainByCategory');
    for (var prop in object) {
        if (object[prop].Ganancia > max) {
            max = object[prop].Ganancia;
            category = prop;
        }
    }
    categoryBadge.innerText = category;
    higherGain.innerText = "$ " + max;
};
higherCategory(reportByCategory);
//Categoría con mayor gasto
var lowerCategory = function (object) {
    var max = 0;
    var category = " ";
    var categoryBadge = document.getElementById('higherExpenseByCategoryBadge');
    var higherExpense = document.getElementById('higherExpenseByCategory');
    for (var prop in object) {
        if (object[prop].Gasto > max) {
            max = object[prop].Gasto;
            category = prop;
        }
    }
    categoryBadge.innerText = category;
    higherExpense.innerText = "$ -" + max;
};
lowerCategory(reportByCategory);
//Categoría con mayor balance
var balanceCategory = function (object) {
    var max = 0;
    var category = " ";
    var categoryBadge = document.getElementById('higherBalanceByCategoryBadge');
    var higherBalance = document.getElementById('higherBalanceByCategory');
    for (var prop in object) {
        var balance = object[prop].Ganancia - object[prop].Gasto;
        if (balance > max) {
            max = balance;
            category = prop;
        }
    }
    categoryBadge.innerText = category;
    higherBalance.innerText = "$ " + max;
};
balanceCategory(reportByCategory);
//Mes con mayor ganancia
var gainByMonth = function (object) {
    var max = 0;
    var month = "";
    var monthBadge = document.getElementById('gainByMonth');
    var gain = document.getElementById('higherGainByMonth');
    for (var prop in object) {
        for (var i in object[prop]) {
            if (object[prop][i].Ganancia > max) {
                max = object[prop][i].Ganancia;
                month = i + "/" + prop;
            }
        }
    }
    monthBadge.innerText = month;
    gain.innerText = "$ " + max;
};
gainByMonth(reportByMonth);
//Mes con mayor gasto
var expenseByMonth = function (object) {
    var max = 0;
    var month = "";
    var monthBadge = document.getElementById('expenseByMonth');
    var expense = document.getElementById('higherExpenseByMonth');
    for (var prop in object) {
        for (var i in object[prop]) {
            if (object[prop][i].Gasto > max) {
                max = object[prop][i].Gasto;
                month = i + "/" + prop;
            }
        }
    }
    monthBadge.innerText = month;
    expense.innerText = "$ -" + max;
};
expenseByMonth(reportByMonth);
