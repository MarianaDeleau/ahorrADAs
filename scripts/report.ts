const storage: LocalStorage = getStorage();

const operaciones = storage.operations;


let totales = {};

operaciones.forEach((op) => {
	const date = new Date(op.date);

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
