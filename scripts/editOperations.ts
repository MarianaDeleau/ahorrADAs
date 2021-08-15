//##### Funcion para editar operaciones #####
// boton a de filters creado por nodos
const btnEditOperation = document.getElementById("editLink");

//inputs editar operacion 
const inputDescription = document.getElementById("descriptionEditOp");
const inputAmount = document.getElementById('amountEditOp');
const inputType = document.getElementById('typeEditOp');
const inputCategory = document.getElementById('categoriesEditOp');
const inputDate = document.getElementById('dateEditOp');

//botones de editarOperacion.html
const btnCanceledEdit = document.getElementById("btnCancelEditOp");
const btnAddEditOp = document.getElementById("btnAddEditOp"); 
// ver como agregar la nueva descripcion de la operacion ??????

const paramsUrl = new URLSearchParams(window.location.search);
const idUrl = parseInt(paramsUrl.get("id"));

const descriptionUrl = paramsUrl.get("description")
const amountUrl = paramsUrl.get("amount")
const typeUrl = paramsUrl.get("type")
const categoryUrl = paramsUrl.get("category")
const dateUrl = paramsUrl.get("date")

inputDescription.value = descriptionUrl
inputAmount.value = amountUrl
inputType.value = typeUrl
inputCategory.value = categoryUrl
inputDate.value = dateUrl

const editOperations = (e) => {
	e.preventDefault();
	const editDescription = inputDescription.value;
	const editAmount = inputAmount.value;
	const editType = inputType.value;
	const editCategory = inputCategory.value;
	const editDate = inputDate.value;
		
	if (editDescription != "") {
		const storageAux = getStorage();
		for (let i = 0; i < storageAux.operations.length; i++) {
			if (storageAux.operations[i].id == idUrl) {
				storageAux.operations[i].description = editDescription;
				storageAux.operations[i].amount = editAmount;
				storageAux.operations[i].type = editType;
				storageAux.operations[i].category = editCategory
				storageAux.operations[i].date = editDate
				break;
			}
		}
		localStorage.setItem("key-ahorradas", JSON.stringify(storageAux));
		window.location.href = "index.html";
	}
};
btnAddEditOp.addEventListener("click", editOperations);


// boton de cancelar deberia volver a la pagina pricipal index. html (no funciona)


// const canceledEdit = () => {
// 	window.location.href = "index.html";
// };
// btnCanceledEdit.addEventListener("click", canceledEdit);


const categoryEditOperation = () => {
    
    const storage: LocalStorage = getStorage();

    const selectCategoriesNuevaOp = document.getElementById('categoriesEditOp');
    

    for (const category of storage.categories) {
        const elem = document.createElement("option");
        elem.innerText = category.name;
        elem.value = category.name;
        selectCategoriesNuevaOp.appendChild(elem);
    }
};

const init4 = () => {
    categoryEditOperation();
};

init4();