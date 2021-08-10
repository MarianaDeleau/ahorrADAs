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
        <h6 class="text-end">${operation.amount}</h6>
        </div>
        <div class="col-md-2 d-flex align-items-end flex-column justify-content-center">
        <a href="" class="text-end">Editar</a>
        <a href="" class="text-end">Eliminar</a>
        </div>`;
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
  
    return addOperationToList(operationsType)
}
  
//######### FILTRA POR CATEGORIA #######

const categoryOpFilter = (Category) => {
    
    const storage: LocalStorage = getStorage();
  
    let operationsCategory =  storage.operations.filter((operation) => operation.category === Category)
  
    return addOperationToList(operationsCategory)
}
  
//######### FUNCION PARA FILTROS GENERAL #######

const formFilters = document.getElementById('filtersForm');

const operationFilter = () => {
  const typeFilter = document.getElementById('typeFilter')
  const categoryFilter = document.getElementById('categories')
  let type = typeFilter.value
  let category = categoryFilter.value
  
    if (type !== 'Todas') {
      console.log(typeOpFilter(type));
      
    } else if (category !== 'Todas') {
        console.log(categoryOpFilter(category));
    }
   
}


formFilters.addEventListener('change', operationFilter)