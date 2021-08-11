const formAddCategory = document.getElementById('form-add-category');
const categoriesList = document.getElementById('categoriesList');

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

   
   const storageAux = getStorage()
   storageAux.categories.push(newCategory)
   localStorage.setItem('key-ahorradas', JSON.stringify(storageAux));
   
   addcategoryToList();
   //storage.categories.push(newCategory);
   //localStorage.setItem('key-ahorradas', JSON.stringify(storage));
 
 }
 
formAddCategory.addEventListener('submit', createCategory);

const addcategoryToList = () => {

   categoriesList.innerHTML= " "
   const storage: LocalStorage = getStorage();

   for (const category of storage.categories) {
      const newCategoryLine = document.createElement('div');
      newCategoryLine.innerHTML = `<div class="row mt-5 mb-5">
      <div class="col-9 align-items-center d-flex">
         <p class="fs-5">${category.name}</p>
      </div>
      <div class="col-3 d-flex justify-content-end">
         <button class="btn me-3" type="button"><a class="text-white" href="./editarCategoria.html">Editar</a></button>
         <button class="btn">Eliminar</button>
      </div>
      </div>`;
      categoriesList.appendChild(newCategoryLine);
      
   }
   

}

  
const init3 = () => {
   addcategoryToList();
 
};

init3();
