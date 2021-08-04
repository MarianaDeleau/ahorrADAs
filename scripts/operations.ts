const formOperation = document.getElementById('formNewOperation');

let storage = getStorage();

const addOperation= (e)=>{
    e.preventDefault();
    const form = e.target;
    const newOperationName: string = form.description.value;
    const amountOperation: number = form.amount.value;
    const categoryOperation: Category[] = form.category.value;
    const dateOperation: Date = form.date.value;
 // verificar

    const newOperation: Operation = {
        description: newOperationName,
        amount: amountOperation,
        category: categoryOperation,
        type: "Ganancia" | "Gasto",
        date: dateOperation
    };

    storage.operations.push(newOperation)
    localStorage.setItem("key-ahorradas", JSON.stringify(storage));
}
formOperation.addEventListener("submit", addOperation);