

const formOperation = document.getElementById('formNewOperation');

const getOperationId = () => {

    const storage: LocalStorage = getStorage();
 
    if(storage.operations.length > 0) {
       const lastItem = storage.operations[storage.operations.length -1];
       return lastItem.id + 1;
    } 
 
    return 1;
}
 
const addOperation= (e)=>{
    e.preventDefault();
    const form = e.target;
    const categoryOperation: Category[] = form.categoriesNuevaOp.value; /*chequear q tome del LS*/
    const amountOperation: number = form.amountOp.value;
    const newOperationName: string = form.descriptionOp.value;
    const dateOperation: Date = form.dateOp.value;
    const typeOperation: string = form.typeOp.value
 
    const newOperation: Operation = {
        id: getOperationId(),
        category: categoryOperation,
        amount: amountOperation,
        description: newOperationName,
        date: dateOperation,
        type: typeOperation,
    };

    const storageAux = getStorage()
    storageAux.operations.push(newOperation)
    localStorage.setItem('key-ahorradas', JSON.stringify(storageAux));
    closeOpenedWindow();
}

formOperation.addEventListener("submit", addOperation);

//######### AGREGA CATEGORIAS AL SELECT DE NUEVAS OPERACIONES #######

const categoryNewOperation = () => {
    
    const storage: LocalStorage = getStorage();

    const selectCategoriesNuevaOp = document.getElementById('categoriesNuevaOp');
    

    for (const category of storage.categories) {
        const elem = document.createElement("option");
        elem.innerText = category.name;
        elem.value = category.name;
        selectCategoriesNuevaOp.appendChild(elem);
    }
};

//######### INICIALIZA LA PAGINA PARA CARGAR DATOS DEL STORAGE#######

const init2 = () => {
    categoryNewOperation();
};

init2();

//######### FUNCION PARA CERRAR VENTANA LUEGO DE AGREGAR OPERACION #######

const closeOpenedWindow = () => {
    
    this.close();
}


//######### FUNCION PARA CERRAR VENTANA CON CANCELAR #######

const cancelNewOp = () => {

    closeOpenedWindow()

}

const btnCancelOp = document.getElementById('btnCancelOp');

btnCancelOp.addEventListener("click", cancelNewOp)



