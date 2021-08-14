const loadSelect = () => {

    const storage: LocalStorage = getStorage();
 
    const selectCategories = document.getElementById('categories');
    //console.log(selectCategories)
    //let selectCategoriesNuevaOp= document.getElementById('categories-nuevaOp')
 
    for (const category of storage.categories) {
 
        // selectCategories.innerHTML += `<option value="${category.id}">${category.name}</option>`
        const elem = document.createElement('option');
        elem.innerText = category.name;
        elem.value = category.name;
        selectCategories.appendChild(elem);
         
    }
 
};

//######### FUNCION PARA ELIMINAR OPERACIONES #######

const deleteLink = document.querySelectorAll(".deleteLink");
	
const deleteOperation = (e) => {

	const idToDelete = e.target.dataset.operation; //id del elemento a eliminar
    console.log(idToDelete)
	const storageAux = getStorage(); // Leo el local storage y me lo guardo en esta variable

	// Recorro el local storage en búsqueda del elemento que tengo que eliminar

	for (let i = 0; i < storageAux.operations.length; i++) {
		if (storageAux.operations[i].id == idToDelete) {
            storageAux.operations.splice(i, 1); // posicion y cuantos elementos elimino
            console.log(storageAux)
        
			break;
		}
	}
    
    localStorage.setItem("key-ahorradas", JSON.stringify(storageAux));
    operationFilter()
    
};

// //
 

//######### AGREGA LOS DIV DE LA OPERACIONES A LA LISTA #######

const operationsList = document.getElementById('operations');

const addOperationToList = (array) => {

 
    for (const operation of array) {
        
        if (operation.type === 'Gasto') {
            
            const h6 = createNode("h6", { class: "text-center" }, document.createTextNode(operation.description));
            const divDescription = createNode("div", { class: "col-md-3 d-flex align-items-center" }, h6);
            const badge = createNode("div", { class: "badge p-2 text-dark text-wrap", style: "width: 6rem" }, document.createTextNode(operation.category));
            const divCategory = createNode("div", { class: "col-md-3 d-flex align-items-center" }, badge)
            const date = createNode("p", { class: "text-end" }, document.createTextNode(operation.date));
            const divDate = createNode("div", { class: "col-md-2 d-flex align-items-center justify-content-end" }, date)
            const amount = createNode("h6", { class: "text-end", style: "color:red; font-weight:800" }, document.createTextNode((parseInt(operation.amount) * -1).toString()))
            const divAmount = createNode("div", { class: "col-md-2 d-flex align-items-center justify-content-end" }, amount);
            const editLink = createNode("a", { class: "text-end editLink", data: { operation: operation.id }}, document.createTextNode("Editar"));
            const deleteLink = createNode("a", { class: "text-end deleteLink", data: { operation: operation.id } }, document.createTextNode("Eliminar"));
            const divLinks = createNode("div", { class: "col-md-2 d-flex align-items-end flex-column justify-content-center" }, editLink, deleteLink)
            const newOperationLine = createNode("div", { class: "row mt-3" }, divDescription, divCategory, divDate, divAmount, divLinks);
            operationsList.appendChild(newOperationLine);
            
        } else if (operation.type === 'Ganancia') {

            const h6 = createNode("h6", { class: "text-center" }, document.createTextNode(operation.description));
            const divDescription = createNode("div", { class: "col-md-3 d-flex align-items-center" }, h6);
            const badge = createNode("div", { class: "badge p-2 text-dark text-wrap", style: "width: 6rem" }, document.createTextNode(operation.category));
            const divCategory = createNode("div", { class: "col-md-3 d-flex align-items-center" }, badge)
            const date = createNode("p", { class: "text-end" }, document.createTextNode(operation.date));
            const divDate = createNode("div", { class: "col-md-2 d-flex align-items-center justify-content-end" }, date)
            const amount = createNode("h6", { class: "text-end", style: "color:green; font-weight:800" }, document.createTextNode(operation.amount))
            const divAmount = createNode("div", { class: "col-md-2 d-flex align-items-center justify-content-end" }, amount);
            const editLink = createNode("a", { class: "text-end editLink", data: { operation: operation.id } }, document.createTextNode("Editar"));
            const deleteLink = createNode("a", { class: "text-end deleteLink", data: { operation: operation.id } }, document.createTextNode("Eliminar"));
            const divLinks = createNode("div", { class: "col-md-2 d-flex align-items-end flex-column justify-content-center" }, editLink, deleteLink)
            const newOperationLine = createNode("div", { class: "row mt-3" }, divDescription, divCategory, divDate, divAmount, divLinks);
            operationsList.appendChild(newOperationLine);
            
        }
    
    }
    
    //RECORRE LOS BOTONES

	const deleteLink = document.querySelectorAll(".deleteLink");
	for (let i = 0; i < deleteLink.length; i++) {
		deleteLink[i].addEventListener("click", deleteOperation);
	}

	// const editLink = document.querySelectorAll(".editLink");
	// for (let i = 0; i < editLink.length; i++) {
	// 	editLink[i].addEventListener("click", editCategory);
	// }
}
 
//######### INICIALIZA LA PAGINA #######
 
const init = () => {
    loadSelect()
 }
 
init();


//######### FILTRA POR GASTO O GANANCIA #######

const typeOpFilter = (type) => {
    
    const storage: LocalStorage = getStorage();
  
    let operationsType = storage.operations.filter((operation) => operation.type === type);
  
    balance(operationsType);

    return addOperationToList(operationsType)
}
  
//######### FILTRA POR CATEGORIA #######

const categoryOpFilter = (Category) => {
    
    const storage: LocalStorage = getStorage();
  
    let operationsCategory =  storage.operations.filter((operation) => operation.category === Category)
  
    balance(operationsCategory);
    
    return addOperationToList(operationsCategory)
}
  
//######### FUNCION PARA FILTROS GENERAL #######

const formFilters = document.getElementById('filtersForm');
const divNoOps = document.getElementById('noOperations');
const divWithOps = document.getElementById('operationsListHeader');


const operationFilter = () => {

    divNoOps.style.display = 'none'
    divWithOps.style.display = 'block'
    operationsList.innerHTML = ""
    
  const typeFilter = document.getElementById('typeFilter')
  const categoryFilter = document.getElementById('categories')
  let type = typeFilter.value
  let category = categoryFilter.value
  
    if (type !== 'Todas') {
      typeOpFilter(type);
      
    } else if (category !== 'Todas') {
        categoryOpFilter(category);
    }
   
}


formFilters.addEventListener('change', operationFilter)

//######### FUNCION PARA ABRIR VENTANA #######

let openedWindow;

const btnNewOp = document.getElementById('btnNewOp')

const openWindow = () => {
    openedWindow = window.open('./nuevaOperacion.html');
}

btnNewOp.addEventListener("click", openWindow)

//######### FUNCION PARA BALANCE #######


let balanceGastos: number = 0 
let balanceGanancias: number = 0
let res: number = 0

let balance = (operations) => {    

    let divGanancias = document.getElementById('balanceGanancias')
    let divGastos = document.getElementById('balanceGastos')
    let divTotal = document.getElementById('balanceTotal')
    divGastos.innerText = "$ 0";
    divGanancias.innerText = "$ 0";
    divTotal.innerText = "$ 0";
    
    for (let operation of operations){
        
        
        if (operation.type === 'Gasto') {
           balanceGastos = balanceGastos + parseInt(operation.amount);
           divGastos.innerText=`$ -${balanceGastos}`
        } else if (operation.type === 'Ganancia') {
            balanceGanancias = balanceGanancias + parseInt(operation.amount)
            divGanancias.innerText=`$ +${balanceGanancias}`            
        } 

        res = balanceGanancias - balanceGastos
        divTotal.innerText=`$ ${res}`

        
    }

    balanceGastos = 0;
    balanceGanancias = 0;
    res = 0;

}
