//####### VARIABLES #######

const formOperation = document.getElementById('formNewOperation');


//####### SET DINAMIC ID FOR OPERATIONS / SETEAR ID DINAMICOS PARA OPERACIONES  #######

const getOperationId = () => {

    const storage: LocalStorage = getStorage();
 
    if(storage.operations.length > 0) {
       const lastItem = storage.operations[storage.operations.length -1];
       return lastItem.id + 1;
    } 
 
    return 1;
}

//####### ADD OPERATIONS TO LOCAL STORAGE / AGREGAR OPERACIONES AL LOCAL STORAGE  #######
 
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

//######### ADD CATEGORYS TO SELECT IN NEW OPERATIONS /  AGREGA CATEGORIAS AL SELECT DE NUEVAS OPERACIONES #######

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

//######### INITIALIZE HTML TO ADD ELEMENTS FROM STORAGE / INICIALIZA LA PAGINA PARA CARGAR DATOS DEL STORAGE#######

const init2 = () => {
    categoryNewOperation();
};

init2();

//######### CLOSE WINDOW AFTER ADDING OPERATIONS / FUNCION PARA CERRAR VENTANA LUEGO DE AGREGAR OPERACION #######

const closeOpenedWindow = () => {
    
    this.close();
}


//######### CLOSE WINDOW CANCELING / FUNCION PARA CERRAR VENTANA CON CANCELAR #######

const cancelNewOp = () => {

    closeOpenedWindow()

}

const btnCancelOp = document.getElementById('btnCancelOp');

btnCancelOp.addEventListener("click", cancelNewOp)



