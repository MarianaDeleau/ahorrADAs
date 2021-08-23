//##### SET TYPES / DEFINIR TIPOS ######

type LocalStorage = {
    categories?: Category[],
    operations?: Operation[]
 }
 
type Category = {
    id: number,
    name: string,
}
 
type Operation = {
    id: number,
    category: Category[],
    amount: number,
    description: string,
    date: Date,
    type: string
}


//##### READING LOCAL STORAGE / LEER EL STORAGE ######

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


//##### CREATE NODES FUNCTION / FUNCIOND PARA CREAR NODOS DE MANERA DINAMICA ######

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
