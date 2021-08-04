type LocalStorage = {
    categories?: Category[],
    operations?: Operation[]
 }
 
type Category = {
    id: number,
    name: string,
    //slug: string
}
 
type Operation = {
    id: number,
    category: Category[],
    amount: number,
    description: string,
    date: Date,
    type: string
}

type Gain = {
    id: number;
    category: Category[],
    amount: number,
    description: string,
    date: Date
}

type Expense = {
    id: number;
    category: Category[],
    amount: number,
    description: string,
    date: Date
}


const getStorage = (): LocalStorage => {
    let storageInfo: LocalStorage = JSON.parse(
        localStorage.getItem('key-ahorradas'));

    if (!storageInfo) {
        storageInfo = {
            categories: [],
            operations: []
        };
    }

    return storageInfo;
};

//####### union todos los scripts ######

const formAddCategory = document.getElementById('form-add-category');
let storage = getStorage();

const getIdCategory = () => {

    const storage: LocalStorage = getStorage();
 
    if(storage.categories.length > 0) {
       const lastItem = storage.categories[storage.categories.length -1];
       return lastItem.id + 1;
    } 
 
    return 1;
 }

 const createCategory = (e) => {
    e.preventDefault();
 
      const form = e.target;
 
      const newCategoryName: string = form.nameCategory.value;
 
      const newCategory: Category = {
         id: getIdCategory(),
         name: newCategoryName,
         //slug: slugify(newCategoryName)
      }
 
      storage.categories.push(newCategory);
 
      localStorage.setItem('key-ahorradas', JSON.stringify(storage));
 
 }
 
formAddCategory.addEventListener('submit', createCategory);
 
const loadFields = () => {

    const storage: LocalStorage = getStorage();
 
    const selectCategories = document.getElementById('categories');
    //console.log(selectCategories)
    //let selectCategoriesNuevaOp= document.getElementById('categories-nuevaOp')
 
    for(const category of storage.categories) {
 
       const elem = document.createElement('option');
       elem.innerText = category.name;
       elem.value = category.id.toString();
       selectCategories.appendChild(elem);
        //selectCategoriesNuevaOp.appendChild(elem)
 
    }
 
}
 
const init = () => {
    loadFields()
 }
 
init();
 
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
    const categoryOperation: Category[] = form.categoryOp.value;
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

    storage.operations.push(newOperation)
    localStorage.setItem('key-ahorradas', JSON.stringify(storage));
}
formOperation.addEventListener("submit", addOperation);