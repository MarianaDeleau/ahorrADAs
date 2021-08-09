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
    let storageInfo: LocalStorage = JSON.parse(localStorage.getItem('key-ahorradas'));

    if (!storageInfo) {
        storageInfo = {
            categories: [],
            operations: []
        };
    }

    return storageInfo;
};



let storage = getStorage();

const loadFields = () => {

    const storage: LocalStorage = getStorage();
 
    const selectCategories = document.getElementById('categories');
    //console.log(selectCategories)
    //let selectCategoriesNuevaOp= document.getElementById('categories-nuevaOp')
 
    for(const category of storage.categories) {
 
        // selectCategories.innerHTML += `<option value="${category.id}">${category.name}</option>`
        const elem = document.createElement('option');
        elem.innerText = category.name;
        elem.value = category.id.toString();
        selectCategories.appendChild(elem);
         
    }
 
}
 
const init = () => {
    loadFields()
 }
 
 init();