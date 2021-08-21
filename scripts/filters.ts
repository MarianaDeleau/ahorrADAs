//######### AGREGA CATEGORIAS AL SELECT DE FILTROS #######

const loadSelect = () => {
	const storage: LocalStorage = getStorage();

	const selectCategories = document.getElementById("categories");
	//console.log(selectCategories)
	//let selectCategoriesNuevaOp= document.getElementById('categories-nuevaOp')

	for (const category of storage.categories) {
		const elem = document.createElement("option");
		elem.innerText = category.name;
		elem.value = category.name;
		selectCategories.appendChild(elem);
	}
};

//######### INICIALIZA LA PAGINA PARA CARGAR DATOS DEL STORAGE #######

const init = () => {
	loadSelect();
};

init();


//######### AGREGA LOS DIV DE LA OPERACIONES A LA LISTA #######

const operationsList = document.getElementById("operations");

const addOperationToList = (array) => {
	for (const operation of array) {
		if (operation.type === "Gasto") {
			const h6 = createNode("h6",	{ class: "text-center" }, document.createTextNode(operation.description));
			const divDescription = createNode("div", { class: "col-md-3 d-flex align-items-center" }, h6	);
			const badge = createNode("div",	{ class: "badge p-2 text-dark text-wrap", style: "width: 7rem"	}, document.createTextNode(operation.category));
			const divCategory = createNode('div', { class: "col-3 col-md-3 d-flex align-items-center" }, badge);
			const date = createNode("p", { class: "text-end" }, document.createTextNode(operation.date));
			const divDate = createNode(	"div", { class: "col-3 col-md-2 d-flex align-items-center justify-content-end"},	date);
			const amount = createNode( "h6", { class: "text-end", style: "color:red; font-weight:800" }, document.createTextNode(`-${operation.amount}`)); //document.createTextNode((parseInt(operation.amount) * -1).toString()));
			const divAmount = createNode("div",	{ class: "col-md-2 d-flex align-items-center justify-content-end"},	amount);
			const editLink = createNode("a", { class: "text-end editLink", data: { operation: operation.id }, href: `./editarOperacion.html?id=${operation.id}&description=${operation.description}&amount=${operation.amount}&type=${operation.type}&category=${operation.category}&date=${operation.date}` }, document.createTextNode("Editar"));
			const deleteLink = createNode("a",	{ class: "text-end deleteLink",	data: { operation: operation.id }}, document.createTextNode("Eliminar")	);
			const divLinks = createNode("div",	{class: "col-md-2 d-flex align-items-end flex-column justify-content-center"},	editLink,deleteLink	);
			const newOperationLine = createNode("div",	{ class: "row row-cols-6 justify-content-between" },	divDescription,	divCategory, divDate, divAmount, divLinks);
			operationsList.appendChild(newOperationLine);

		} else if (operation.type === "Ganancia") {
			const h6 = createNode("h6", { class: "text-center" }, document.createTextNode(operation.description));
			const divDescription = createNode("div", { class: "col-md-3 d-flex align-items-center" }, h6);
			const badge = createNode("div",	{ class: "badge p-2 text-dark text-wrap", style: "width: 7rem"	},	document.createTextNode(operation.category));
			const divCategory = createNode(	"div",	{ class: "col-3 col-md-3 d-flex align-items-center" },	badge);
			const date = createNode("p",	{ class: "text-end" },	document.createTextNode(operation.date));
			const divDate = createNode(	"div", { class: "col-3 col-md-2 d-flex align-items-center justify-content-end"}, date);
			const amount = createNode("h6",	{ class: "text-end", style: "color:green; font-weight:800" },	document.createTextNode(operation.amount));
			const divAmount = createNode("div",	{	class: "col-md-2 d-flex align-items-center justify-content-end"},	amount);
			const editLink = createNode("a", {	class: "text-end editLink",	data: { operation: operation.id }, href: `./editarOperacion.html?id=${operation.id}&description=${operation.description}&amount=${operation.amount}&type=${operation.type}&category=${operation.category}&date=${operation.date}`},	document.createTextNode("Editar"));
			const deleteLink = createNode("a",	{ class: "text-end deleteLink",	data: { operation: operation.id },}, document.createTextNode("Eliminar"));
			const divLinks = createNode("div",	{	class: "col-md-2 d-flex align-items-end flex-column justify-content-center"}, editLink,deleteLink);
			const newOperationLine = createNode("div",	{ class: "row row-cols-6 justify-content-between" },	divDescription,	divCategory, divDate, divAmount, divLinks);
			operationsList.appendChild(newOperationLine);
		}
	}

	//RECORRE LOS BOTONES

	const deleteLink = document.querySelectorAll(".deleteLink");
	for (let i = 0; i < deleteLink.length; i++) {
		deleteLink[i].addEventListener("click", deleteOperation);
	}

};



//######### FILTRA POR GASTO O GANANCIA #######

const typeOpFilter = (operationsArray, filterType) => {
  if (filterType !== "Todas")
    return operationsArray.filter(
      operation => operation.type === filterType
    );
  return operationsArray;
};

//######### FILTRA POR CATEGORIA #######

const categoryOpFilter = (operationsArray, category) => {
  if(category !== "Todas") 
    return operationsArray.filter(
      operation => operation.category === category
    );
  return operationsArray;
};

//######### FILTRA POR FECHA #######


const operationsDate = (operationsArray, date) => {
	return operationsArray.filter((op) => {
		return date <= new Date(op.date);
	});
};

//######### FILTRO ORDENAR #######

const sortDate = (op1, op2) => {
  if (op1.date > op2.date) {
    return 1
  }
  if (op1.date < op2.date) {
    return -1;
  }
  // a must be equal to b
  return 0;
}

const sortAmount = (op1, op2) => {
	
	const numberA = op1.type === 'Ganancia' ? Number(op1.amount) : (Number(op1.amount) * -1)
	const numberB = op2.type === 'Ganancia'?Number(op2.amount):(Number(op2.amount)*-1)
	
	return numberA - numberB

}

const sortAZ = (op1, op2) => {
  if (op1.description > op2.description) {
    return 1
  }
  if (op1.description < op2.description) {
    return -1;
  }
  // a must be equal to b
  return 0;
}

const operationsSort = (operationsArray, sortType) => {
  switch(sortType){
    case "sortDateAsc":
      return operationsArray.sort((op1, op2) => { return sortDate(op1, op2) });
    case "sortDateDesc":
      return operationsArray.sort((op1, op2) => { return sortDate(op2, op1) });
    case "sortAmountAsc":
      return operationsArray.sort((op1, op2) => { return sortAmount(op1, op2) });
    case "sortAmountDesc":
      return operationsArray.sort((op1, op2) => { return sortAmount(op2, op1) });
    case "sortAZ":
      return operationsArray.sort((op1, op2) => { return sortAZ(op1, op2) });
    case "sortZA":
      return operationsArray.sort((op1, op2) => { return sortAZ(op2, op1) });
    default:
      return operationsArray
  }
};

//######### FUNCION PARA FILTROS GENERAL #######

const formFilters = document.getElementById("filtersForm");
const divNoOps = document.getElementById("noOperations");
const divWithOps = document.getElementById("operationsListHeader");

const operationFilter = (event) => {
	divNoOps.style.display = "none";
	divWithOps.style.display = "block";
	operationsList.innerHTML = "";


  // Operations list
	const storage: LocalStorage = getStorage();
    let operationsArray = storage.operations;

    const typeFilter = document.getElementById("typeFilter");
    const type = typeFilter.value;
    operationsArray = typeOpFilter(operationsArray, type);
  
    const categoryFilter = document.getElementById("categories");
    const category = categoryFilter.value;
    operationsArray = categoryOpFilter(operationsArray, category);

    const dateOperationFilter = document.getElementById(`dateOperationFilter`);
		if(dateOperationFilter.value !== "") {
		const date = new Date(dateOperationFilter.value);
		operationsArray = operationsDate(operationsArray, date);
		}

	const sortFilter = document.getElementById("sortFilter");
	const sortType = sortFilter.value;
	operationsArray = operationsSort(operationsArray, sortType)

	balance(operationsArray);

	return addOperationToList(operationsArray);

};

formFilters.addEventListener("change", operationFilter);

//######### FUNCION PARA ELIMINAR OPERACIONES #######

const deleteLink = document.querySelectorAll(".deleteLink");

const deleteOperation = (e) => {
	const idToDelete = e.target.dataset.operation; //id del elemento a eliminar
	const storageAux = getStorage(); // Leo el local storage y me lo guardo en esta variable

	// Recorro el local storage en búsqueda del elemento que tengo que eliminar

	for (let i = 0; i < storageAux.operations.length; i++) {
		if (storageAux.operations[i].id == idToDelete) {
			storageAux.operations.splice(i, 1); // posicion y cuantos elementos elimino
			break;
		}
	}

	localStorage.setItem("key-ahorradas", JSON.stringify(storageAux));
	operationFilter();
};

//######### FUNCION PARA ABRIR VENTANA NUEVA OPERACION #######

let openedWindow;

const btnNewOp = document.getElementById("btnNewOp");

const openWindow = () => {
	openedWindow = window.open("./nuevaOperacion.html");
};

btnNewOp.addEventListener("click", openWindow);

//######### FUNCION PARA BALANCE #######

let balanceGastos: number = 0;
let balanceGanancias: number = 0;
let res: number = 0;

let balance = (operations) => {
	let divGanancias = document.getElementById("balanceGanancias");
	let divGastos = document.getElementById("balanceGastos");
	let divTotal = document.getElementById("balanceTotal");
	divGastos.innerText = "$ 0";
	divGanancias.innerText = "$ 0";
	divTotal.innerText = "$ 0";

	for (let operation of operations) {
		if (operation.type === "Gasto") {
			balanceGastos = balanceGastos + parseInt(operation.amount);
			divGastos.innerText = `$ -${balanceGastos}`;
		} else if (operation.type === "Ganancia") {
			balanceGanancias = balanceGanancias + parseInt(operation.amount);
			divGanancias.innerText = `$ +${balanceGanancias}`;
		}

		res = balanceGanancias - balanceGastos;
		divTotal.innerText = `$ ${res}`;
	}

	balanceGastos = 0;
	balanceGanancias = 0;
	res = 0;
};



//######### TOGGLE FILTROS #######

const toggleLink = document.getElementById('toggle-filtros')
const hideFilters = document.getElementById('hideFilters')
const displayFilters = document.getElementById('displayFilters')
const headerFilters = document.getElementById('headerFilters')

const toggleFilters = () => {

    formFilters.classList.toggle('dnone');
    hideFilters.classList.toggle('dnone');
    displayFilters.classList.toggle('dnone')
    headerFilters.classList.toggle('mb-4')
}

toggleLink.addEventListener('click', toggleFilters)
