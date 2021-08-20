const storage: LocalStorage = getStorage();

const operaciones = storage.operations;




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


//###### VISTA RESUMEN POR MES ######

const addReportByMonthToList = (object) => {

	const totalsByMonth = document.getElementById('totalsByMonthDiv')
		
	for (const prop in object) {
			
		for (const i in object[prop]) {
			
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
		
};


addReportByMonthToList(reportByMonth)

//###### VISTA RESUMEN GENERAL ######

//Categoría con mayor ganancia

const higherCategory = (object) => {

	let max = 0;
	let category = " ";
	const categoryBadge = document.getElementById('higherGainByCategoryBadge');
	const higherGain = document.getElementById('higherGainByCategory')
	for (const prop in object) {
		
		if (object[prop].Ganancia > max) {
			max = object[prop].Ganancia;
			category = prop
		}
	}
	categoryBadge.innerText = category
	higherGain.innerText = `$ ${max}`
	
}

higherCategory(reportByCategory)

//Categoría con mayor gasto

const lowerCategory = (object) => {

	let max = 0;
	let category = " ";
	const categoryBadge = document.getElementById('higherExpenseByCategoryBadge');
	const higherExpense = document.getElementById('higherExpenseByCategory')
	for (const prop in object) {
		
		if (object[prop].Gasto > max) {
			max = object[prop].Gasto;
			category = prop
		}
	}
	categoryBadge.innerText = category
	higherExpense.innerText = `$ -${max}`
	
}

lowerCategory(reportByCategory)

//Categoría con mayor balance

const balanceCategory = (object) => {

	let max = 0;
	let category = " ";
	const categoryBadge = document.getElementById('higherBalanceByCategoryBadge');
	const higherBalance = document.getElementById('higherBalanceByCategory')

	for (const prop in object) {
		let balance = object[prop].Ganancia - object[prop].Gasto 
		if (balance > max) {
			max = balance;
			category = prop
		}
	}
	categoryBadge.innerText = category
	higherBalance.innerText = `$ ${max}`
	
}

balanceCategory(reportByCategory)

//Mes con mayor ganancia

const gainByMonth = (object) => {

	let max = 0;
	let month = ""
	const monthBadge = document.getElementById('gainByMonth');
	const gain = document.getElementById('higherGainByMonth')

	for (const prop in object) {
			
		for (const i in object[prop]) {
		 
			if (object[prop][i].Ganancia > max) {
				max = object[prop][i].Ganancia;
				month = `${i}/${prop}`
			}
		}
	}
	monthBadge.innerText = month
	gain.innerText = `$ ${max}`
	
}

gainByMonth(reportByMonth)

//Mes con mayor gasto

const expenseByMonth = (object) => {

	let max = 0;
	let month = ""
	const monthBadge = document.getElementById('expenseByMonth');
	const expense = document.getElementById('higherExpenseByMonth')

	for (const prop in object) {
			
		for (const i in object[prop]) {
		 
			if (object[prop][i].Gasto > max) {
				max = object[prop][i].Gasto;
				month = `${i}/${prop}`
			}
		}
	}
	monthBadge.innerText = month
	expense.innerText = `$ -${max}`
	
}

expenseByMonth(reportByMonth)

const displayReport = () => {

	const divNoOps = document.getElementById("noOperations");
	const divWithOps = document.getElementById("operationsReport");
	
	console.log(operaciones)
	if (operaciones.length === 0) {
		divNoOps.style.display = "block";
		divWithOps.style.display = "none";
	} else {
		divNoOps.style.display = "none";
		divWithOps.style.display = "block";
	}

}

displayReport()