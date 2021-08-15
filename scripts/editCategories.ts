//#### section editar categoria ####

// Selectores

// Input del usuario
const inputCategory = document.getElementById("editCategory");
// Boton para confirmar la edicion de la categoría
const btnEditCategory = document.getElementById("edit-btn2");
const btnCanceled = document.getElementById("canceled-btn")


// Busco en la url el id de la categoría que voy a editar.
const paramsUrl = new URLSearchParams(window.location.search);
const idUrl = parseInt(paramsUrl.get("id"));

const editCategories = (e) =>{
  e.preventDefault();
  const input = inputCategory.value;
  if (input != ""){
  const storageAux = getStorage();
  for (let i = 0; i < storageAux.categories.length; i++) {
		if (storageAux.categories[i].id == idUrl) {
			storageAux.categories[i].name = input;
			break;
		}
	}
  localStorage.setItem("key-ahorradas", JSON.stringify(storageAux));
  window.location.href = "categorias.html";
  }
}
btnEditCategory.addEventListener("click", editCategories);

const canceled = () =>{
  window.location.href = "categorias.html";
}
btnCanceled.addEventListener("click",canceled)