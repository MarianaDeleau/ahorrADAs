const storage: LocalStorage = getStorage();

const operaciones = storage.operations;

//###### RESUMEN GENERAL ######

let report = {}

operaciones.forEach((op) => {
	const date = new Date(op.date);
	const year = date.getFullYear()
	const month = date.getMonth()+1

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

	return report
});

console.log(report);

//###### RESUMEN POR CATEGORIA ######

let reportByCategory = {}

	operaciones.forEach((op) => {
		
		if (!reportByCategory[op.category]) {
			reportByCategory[op.category] = {};
		}
		
		if (!reportByCategory[op.category][op.type]) {
			reportByCategory[op.category][op.type] = 0;
		}
		
		reportByCategory[op.category][op.type] += Number(op.amount);

		return reportByCategory

		
	});		


console.log(reportByCategory);

//###### VISTA RESUMEN POR CATEGORIA ######

const addReportByCategoryToList = (object) => {

	const totalsByCategory = document.getElementById('totalsByCategoryDiv')
		
	for (const prop in object) {

		const categoryTag = createNode('p', { class: "fs-5 badge p-1 text-dark text-wrap ms-3" }, document.createTextNode(prop));
		const divP = createNode('div', { class: "col-md-3" }, categoryTag);
		if (object[prop].Ganancia) {
			const ganancia = createNode('div', { class: "col-md-3 fs-5 text-end text-success" }, document.createTextNode(`$ ${Number(object[prop].Ganancia)}`));
		} else {
			const ganancia = createNode('div', { class: "col-md-3 fs-5 text-end text-success" }, document.createTextNode(`$ ${object[prop].Ganancia = 0}`));
		}
		if (object[prop].Gasto) {
			const gasto = createNode('div', { class: "col-md-3 fs-5 text-end text-danger" }, document.createTextNode(`$ ${Number(object[prop].Gasto)}`));
		} else {
			const gasto = createNode('div', { class: "col-md-3 fs-5 text-end text-danger" }, document.createTextNode(`$ ${object[prop].Gasto = 0}`));
		}

		const balance = createNode('div', { class: "col-md-3 fs-5 text-end" }, document.createTextNode(`$ ${ Number(object[prop].Ganancia) - Number(object[prop].Gasto)}`));
		const row = createNode('div', { class: "row mb-4" }, divP, ganancia, gasto, balance);
		totalsByCategory.appendChild(row)

		}

}

addReportByCategoryToList(reportByCategory)

//###### FUNCION RESUMEN POR MES ######

let reportByMonth = {}

operaciones.forEach((op) => {
	const date = new Date(op.date);
	const year = date.getFullYear()
	const month = date.getMonth()+1

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

	return reportByMonth
});

console.log(reportByMonth);


const addReportByMonthToList = (object) => {

	const totalsByMonth = document.getElementById('totalsByMonthDiv')
		
	for (const prop in object) {
			
		for(const i in object[prop]){
			
			const month = createNode('div', { class: "col-md-3 fs-5 text-start ps-4" }, document.createTextNode(`${i}/${prop}`));

			const isProfit = object[prop][i].Ganancia && object[prop][i].Ganancia >= 0;

			const isExpense = object[prop][i].Gasto && object[prop][i].Gasto >= 0;

			const profit = isProfit ? object[prop][i].Ganancia : 0

			const expense = isExpense ? object[prop][i].Gasto : 0
		
			const ganancia = createNode('div', { class: "col-md-3 fs-5 text-end text-success" }, document.createTextNode(`$ ${profit}`));

			const gasto = createNode('div', { class: "col-md-3 fs-5 text-end text-danger" }, document.createTextNode(`$ ${expense * -1}`));
			
			const balance = createNode('div', { class: "col-md-3 fs-5 text-end" }, document.createTextNode(`$ ${profit - expense}`));

			const row = createNode('div', { class: "row mb-4" }, month, ganancia, gasto, balance);

			totalsByMonth.appendChild(row)

		}
			
	}
		
}


addReportByMonthToList(reportByMonth)

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

