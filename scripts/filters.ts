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
        const newOperationLine = document.createElement('div');
        newOperationLine.classList.add('row', 'mt-3');
        if (operation.type === 'Gasto') {
            newOperationLine.innerHTML = `<div class="col-md-3 d-flex align-items-center ">
        <h6>${operation.description}</h6>
        </div>
        <div class="col-md-3 d-flex align-items-center">
        <div class="badge bg-success p-2 text-white text-wrap" style="width: 6rem;">
        ${operation.category}
        </div>
        </div>
        <div class="col-md-2 d-flex align-items-center justify-content-end">
        <p class="text-end">${operation.date}</p>
        </div>
        <div class="col-md-2 d-flex align-items-center justify-content-end">
        <h6 class="text-end" style="color:red; font-weight:700">-${operation.amount}</h6>
        </div>
        <div class="col-md-2 d-flex align-items-end flex-column justify-content-center">
        <a href="" class="text-end">Editar</a>
        <a href="" class="text-end">Eliminar</a>
        </div>`;
        } else if (operation.type === 'Ganancia') {
            newOperationLine.innerHTML = `<div class="col-md-3 d-flex align-items-center ">
        <h6>${operation.description}</h6>
        </div>
        <div class="col-md-3 d-flex align-items-center">
        <div class="badge bg-success p-2 text-white text-wrap" style="width: 6rem;">
        ${operation.category}
        </div>
        </div>
        <div class="col-md-2 d-flex align-items-center justify-content-end">
        <p class="text-end">${operation.date}</p>
        </div>
        <div class="col-md-2 d-flex align-items-center justify-content-end">
        <h6 class="text-end" style="color:green; font-weight:700">+${operation.amount}</h6>
        </div>
        <div class="col-md-2 d-flex align-items-end flex-column justify-content-center">
        <a href="" class="text-end">Editar</a>
        <a href="" class="text-end">Eliminar</a>
        </div>`;
        }
        operationsList.appendChild(newOperationLine);
    
    }
    
 }
 
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
