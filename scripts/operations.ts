

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
    const categoryOperation: Category[] = form.categoryOp.value; /*chequear q tome del LS*/
    const amountOperation: number = form.amountOp.value;
    const newOperationName: string = form.descriptionOp.value;
    const dateOperation: Date = form.dateOp.value;
    const typeOperation: string = form.typeOp.value
 // verificar

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
}

formOperation.addEventListener("submit", addOperation);


