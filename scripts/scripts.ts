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

type Gain = {
    id: number;
    category: Category[],
    amount: number,
    description: string,
    date: Date
}

type Expense = {
    id: number;
    category: Category[],
    amount: number,
    description: string,
    date: Date
}


//##### LEER EL STORAGE ######

const getStorage = (): LocalStorage => {
    let storageInfo: LocalStorage = JSON.parse(localStorage.getItem('key-ahorradas'));

    if (!storageInfo) {
        storageInfo = {
            categories: [],
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
        console.log({dataElement, tag, prop})
			
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

//let storage = getStorage();

