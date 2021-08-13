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

//######### AGREGA LOS DIV DE LA OPERACIONES A LA LISTA #######

const operationsList = document.getElementById('operations');

const addOperationToList = (array) => {

 
    for (const operation of array) {
        
        if (operation.type === 'Gasto') {
            
            const h6 = createNode("h6", { class: "text-center" }, document.createTextNode(operation.description));
            const divDescription = createNode("div", { class: "col-md-3 d-flex align-items-center" }, h6);
            const badge = createNode("div", { class: "badge bg-success p-2 text-white text-wrap", style: "width: 6rem" }, document.createTextNode(operation.category));
            const divCategory = createNode("div", { class: "col-md-3 d-flex align-items-center" }, badge)
            const date = createNode("p", { class: "text-end" }, document.createTextNode(operation.date));
            const divDate = createNode("div", { class: "col-md-2 d-flex align-items-center justify-content-end" }, date)
            const amount = createNode("h6", { class: "text-end", style: "color:red; font-weight:700" }, document.createTextNode((parseInt(operation.amount) * -1).toString()))
            const divAmount = createNode("div", { class: "col-md-2 d-flex align-items-center justify-content-end" }, amount);
            const editLink = createNode("a", { class: "text-end" }, document.createTextNode("Editar"));
            const deleteLink = createNode("a", { class: "text-end" }, document.createTextNode("Eliminar"));
            const divLinks = createNode("div", { class: "col-md-2 d-flex align-items-end flex-column justify-content-center" }, editLink, deleteLink)
            const newOperationLine = createNode("div", { class: "row mt-3" }, divDescription, divCategory, divDate, divAmount, divLinks);
            operationsList.appendChild(newOperationLine);
            
        } else if (operation.type === 'Ganancia') {

            const h6 = createNode("h6", { class: "text-center" }, document.createTextNode(operation.description));
            const divDescription = createNode("div", { class: "col-md-3 d-flex align-items-center" }, h6);
            const badge = createNode("div", { class: "badge bg-success p-2 text-white text-wrap", style: "width: 6rem" }, document.createTextNode(operation.category));
            const divCategory = createNode("div", { class: "col-md-3 d-flex align-items-center" }, badge)
            const date = createNode("p", { class: "text-end" }, document.createTextNode(operation.date));
            const divDate = createNode("div", { class: "col-md-2 d-flex align-items-center justify-content-end" }, date)
            const amount = createNode("h6", { class: "text-end", style: "color:green; font-weight:700" }, document.createTextNode(operation.amount))
            const divAmount = createNode("div", { class: "col-md-2 d-flex align-items-center justify-content-end" }, amount);
            const editLink = createNode("a", { class: "text-end" }, document.createTextNode("Editar"));
            const deleteLink = createNode("a", { class: "text-end" }, document.createTextNode("Eliminar"));
            const divLinks = createNode("div", { class: "col-md-2 d-flex align-items-end flex-column justify-content-center" }, editLink, deleteLink)
            const newOperationLine = createNode("div", { class: "row mt-3" }, divDescription, divCategory, divDate, divAmount, divLinks);
            operationsList.appendChild(newOperationLine);
            
        }
    
    }
    
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

const operationFilter = () => {
  operationsList.innerHTML= ""
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
