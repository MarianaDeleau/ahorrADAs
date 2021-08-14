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



//filtro de fecha

const dateOperationFilter = document.getElementById(`dateOperationFilter`)

const operationsDate = (e) => {
    
    const storage: LocalStorage = getStorage();
    const date = new Date(e.target.value);
    console.log(date.getTime())
  const storageFilter = storage.operations.filter(op =>{
 const opDate = new Date(op.date)
 console.log(opDate)
return date < opDate
})
console.log(storageFilter)
}

dateOperationFilter.addEventListener(`change`, operationsDate) 














// let searchDate = storage.operations.filter(op => op.date == dateOperationFilter.value

// }
// dateOperationFilter.addEventListener(`onChange`, () => {
//   console.log(`++++date++++`)
//   operationsDate()
// });


// Aquí necesitamos filtrar por la fecha, indicando que solo nos muestre aquellas que sean mayores a "10-18-2018"

// Como puedes observar hago n.date es n la var que uso para acceder a la clave date y hacer mi comparación

// let busca = accounts.filter(n => n.date == "10-18-2018")


// array.sort(function(a, b) {
//     a = new Date(a.dateModified);
//     b = new Date(b.dateModified);
//     return a>b ? -1 : a<b ? 1 : 0;
// });
// Esto ordena las fechas de las más recientes.

