// ####### VARIABLES #######

// Input del usuario
const inputCategory = document.getElementById("editCategory");

// Boton para confirmar la edicion de la categoría
const btnEditCategory = document.getElementById("edit-btn2");
const btnCanceled = document.getElementById("canceled-btn")

// Busco en la url el id de la categoría que voy a editar.
const paramsUrl = new URLSearchParams(window.location.search);
const idUrl = paramsUrl.get("id");
const categoryUrl = paramsUrl.get("category")

inputCategory.value = categoryUrl

//######### EDIT CATEGORIES FROM VIEW AND LOCAL STORAGE OPERATIONS / FUNCION PARA EDTAR CATEGORIAS DE LA VISTA Y DEL LOCAL STORAGE #######

const editCategories = (e) => {
	e.preventDefault();
	const input = inputCategory.value;
	if (input != "") {
		const storageAux = getStorage();
		for (let i = 0; i < storageAux.categories.length; i++) {
      
			if (storageAux.categories[i].id.toString() == idUrl) {
        		storageAux.categories[i].name = input;
				break;
			}
		}

    storageAux.operations.forEach(operation => {
      if(operation.category.toString() === categoryUrl){
        operation.category = input;
      }
    })

		localStorage.setItem("key-ahorradas", JSON.stringify(storageAux));
		window.location.href = "categorias.html";
	}
};
btnEditCategory.addEventListener("click", editCategories);



//######### CLOSE WINDOW CANCELING / FUNCION PARA CERRAR VENTANA CON CANCELAR #######

const canceled = () =>{
  window.location.href = "categorias.html";
}
btnCanceled.addEventListener("click",canceled)