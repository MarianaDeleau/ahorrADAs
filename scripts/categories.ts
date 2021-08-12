const formAddCategory = document.getElementById("form-add-category");
const categoriesList = document.getElementById("categoriesList");

const getIdCategory = () => {
	const storage: LocalStorage = getStorage();

	if (storage.categories.length > 0) {
		const lastItem = storage.categories[storage.categories.length - 1];
		return lastItem.id + 1;
	}

	return 1;
};

const createCategory = (e) => {
	e.preventDefault();

	const form = e.target;

	const newCategoryName: string = form.nameCategory.value;

	const newCategory: Category = {
		id: getIdCategory(),
		name: newCategoryName,
		//slug: slugify(newCategoryName)
	};

	const storageAux = getStorage();
	storageAux.categories.push(newCategory);
	localStorage.setItem("key-ahorradas", JSON.stringify(storageAux));

	addcategoryToList();
	//storage.categories.push(newCategory);
	//localStorage.setItem('key-ahorradas', JSON.stringify(storage));
};


// ##### Eliminar Categoria #####

const deleteCategory = (e) => {
	e.preventDefault();

	const idToDelete = e.srcElement.dataset.category; //id del elemento a eliminar

	const storageAux = getStorage(); // Leo el local storage y me lo guardo en esta variable

	// Recorro el local storage en búsqueda del elemento que tengo que eliminar

	for (let i = 0; i < storageAux.categories.length; i++) {
		if (storageAux.categories[i].id == idToDelete) {
			storageAux.categories.splice(i, 1); // posicion y cuantos elementos elimino
      break
		}
	}
  
  localStorage.setItem("key-ahorradas", JSON.stringify(storageAux));
  addcategoryToList();

};

const addcategoryToList = () => {
	categoriesList.innerHTML = " ";
	const storage: LocalStorage = getStorage();

	for (const category of storage.categories) {
		const newCategoryLine = document.createElement("div");
		newCategoryLine.innerHTML = `<div class="row mt-5 mb-5">
      <div class="col-9 align-items-center d-flex">
         <p class="fs-5">${category.name}</p>
      </div>
      <div class="col-3 d-flex justify-content-end">
         <button class="btn me-3" type="button"><a class="text-white" href="./editarCategoria.html">Editar</a></button>
         <button class="btn delete-btn" data-category=${category.id}>Eliminar</button>
      </div>
      </div>`;

		categoriesList.appendChild(newCategoryLine);
	}
	const deleteBtn = document.querySelectorAll(".delete-btn");
	for (let i = 0; i < deleteBtn.length; i++) {
		deleteBtn[i].addEventListener("click", deleteCategory);
	}
};

formAddCategory.addEventListener("submit", createCategory);

const init3 = () => {
	addcategoryToList();
};

init3();


