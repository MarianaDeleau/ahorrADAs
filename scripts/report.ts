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

		// console.log(object[prop]) //imprime Propiedad y valor - {Ganancia: 150000, Gasto: 25000}
		// console.log(prop) //imprime Propiedad categoria - Trabajo
		// console.log(Object.values(object[prop])) //imprime el valor solo - [150000, 25000]

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
			
		for (let i = 0; i < prop.length; i++) {
			
			const month = createNode('div', { class: "col-md-3 fs-5 text-start ps-4" }, document.createTextNode(`${Object.keys(object[prop])[i]}/${prop}`));
			if (Object.values(object[prop])[i].Ganancia) {
				const ganancia = createNode('div', { class: "col-md-3 fs-5 text-end text-success" }, document.createTextNode(`$ ${Object.values(object[prop])[i].Ganancia}`));
			} else {
				const ganancia = createNode('div', { class: "col-md-3 fs-5 text-end text-success" }, document.createTextNode(`$ ${Object.values(object[prop])[i].Ganancia = 0}`));
			}
			
			if (Object.values(object[prop])[i].Gasto) {
				const gasto = createNode('div', { class: "col-md-3 fs-5 text-end text-danger" }, document.createTextNode(`$ ${Object.values(object[prop])[i].Gasto}`));
			} else {
				const gasto = createNode('div', { class: "col-md-3 fs-5 text-end text-danger" }, document.createTextNode(`$ ${Object.values(object[prop])[i].Gasto = 0}`));
			}
			const balance = createNode('div', { class: "col-md-3 fs-5 text-end" }, document.createTextNode(`$ ${Object.values(object[prop])[i].Ganancia - Object.values(object[prop])[i].Gasto}`));
			const row = createNode('div', { class: "row mb-4" }, month, ganancia, gasto, balance);
			totalsByMonth.appendChild(row)

		}
			
	}
		// console.log(object[prop]) //imprime Propiedad y valor - 7: {Ganancia: 150000, Gasto: 25000}
		// console.log(prop) //imprime Propiedad año - 2021
		// console.log(Object.keys(object[prop])) //imprime meses - ["7", "8"]
		// console.log(Object.keys(object[prop])[1]) //imprime mes - 7
		// console.log(Object.values(object[prop])[0].Ganancia) //imprime valores - 150000
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

