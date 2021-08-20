type LocalStorage = {
    categories?: Category[],
    operations?: Operation[]
 }
 
type Category = {
    id: number,
    name: string,
    //slug: string
}
 
type Operation = {
    id: number,
    category: Category[],
    amount: number,
    description: string,
    date: Date,
    type: string
}


//##### LEER EL STORAGE ######

const getStorage = (): LocalStorage => {
    let storageInfo: LocalStorage = JSON.parse(localStorage.getItem('key-ahorradas'));

    if (!storageInfo) {
        storageInfo = {
            categories: [{id:1, name: 'Comida'}, {id:2, name: 'Educación'}, {id:3, name: 'Salidas'}, {id:4, name: 'Servicios'}, {id:5, name: 'Trabajo'}, {id:6, name: 'Transporte'}],
            operations: []
        };
    }

    return storageInfo;
};


//##### CREAR NODOS DE MANERA DINAMICA ######

const createNode = (tag, attr, ...children) => {
	const elem = document.createElement(tag);

	for (const prop in attr) {
		if (prop === "data") {
			for (const dataElement in attr[prop]) {
             //console.log({dataElement, tag, prop})			
        elem.dataset[dataElement] = attr[prop][dataElement];
			}
		} else {
			elem.setAttribute(prop, attr[prop]);
		}
	}
	for (const child of children) {
		elem.appendChild(child);
	}

	return elem;
}; 



//{"categories":[{"id":1,"name":"Educación"},{"id":2,"name":"Comida"},{"id":3,"name":"Trabajo"},{"id":4,"name":"Servicios Públicos"}],"operations":[{"id":4,"category":"Trabajo","amount":"200000","description":"Sueldo IT","date":"2021-08-05","type":"Ganancia"},{"id":7,"category":"Educación","amount":"35000","description":"Colegio","date":"2021-08-05","type":"Gasto"},{"id":9,"category":"Servicios Públicos","amount":"2000","description":"Gas","date":"2021-08-05","type":"Gasto"},{"id":10,"category":"Trabajo","amount":"25000","description":"Viaticos","date":"2021-08-15","type":"Gasto"},{"id":11,"category":"Educación","amount":"35000","description":"Colegio","date":"2021-07-05","type":"Gasto"},{"id":12,"category":"Trabajo","amount":"150000","description":"Sueldo","date":"2021-07-07","type":"Ganancia"},{"id":13,"category":"Comida","amount":"8000","description":"Supermercado","date":"2021-07-14","type":"Gasto"},{"id":14,"category":"Comida","amount":"7500","description":"Supermercado","date":"2021-08-04","type":"Gasto"},{"id":15,"category":"Comida","amount":"13000","description":"Supermercado","date":"2021-06-15","type":"Gasto"},{"id":16,"category":"Trabajo","amount":"150000","description":"Sueldo","date":"2021-05-05","type":"Ganancia"}]}