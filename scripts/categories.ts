// const formAddCategory = document.getElementById('form-add-category');

// const getIdCategory = () => {

//     const storage: LocalStorage = getStorage();
 
//     if(storage.categories.length > 0) {
//        const lastItem = storage.categories[storage.categories.length -1];
//        return lastItem.id + 1;
//     } 
 
//     return 1;
//  }

//  const createCategory = (e) => {
//     e.preventDefault();
 
//       const form = e.target;
 
//       const newCategoryName: string = form.nameCategory.value;
 
//       const newCategory: Category = {
//          id: getIdCategory(),
//          name: newCategoryName,
//          slug: slugify(newCategoryName)
//       }
 
//       storage.categories.push(newCategory);
 
//       localStorage.setItem('todo-storage', JSON.stringify(storage));
 
//  }
 
// formAddCategory.addEventListener('submit', createCategory);
 
// const loadFields = () => {

//     const storage: LocalStorage = getStorage();
 
//     const selectCategories = document.getElementById('categories');
 
//     for(const category of storage.categories) {
 
//        const elem = document.createElement('option');
//        elem.innerText = category.name;
//        elem.value = category.id.toString();
//        selectCategories.appendChild(elem);
 
//     }
 
// }
 
// const init = () => {
//     loadFields()
//  }
 
//  init();