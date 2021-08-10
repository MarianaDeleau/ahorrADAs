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