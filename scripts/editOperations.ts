//##### Funcion para editar operaciones #####
// boton a de filters creado por nodos
const btnEditOperation = document.getElementById("editLink");

//input dexcripcion de nueva operacion 
const inputDescription = document.getElementById("descriptionOp");

//botones de nuevaOperacion.html
const btnCanceledEdit = document.getElementById("btnCancelOp");
const btnAddOperation = document.getElementById("btnAddOp"); 
// ver como agregar la nueva descripcion de la operacion ??????



const paramsUrl = new URLSearchParams(window.location.search);
const idUrl = parseInt(paramsUrl.get("id"));

const editOperations = (e) => {
	e.preventDefault();
	const input = inputDescription.value;
	if (input != "") {
		const storageAux = getStorage();
		for (let i = 0; i < storageAux.operations.length; i++) {
			if (storageAux.operations[i].id == idUrl) {
				storageAux.operations[i].description = input;
				break;
			}
		}
		localStorage.setItem("key-ahorradas", JSON.stringify(storageAux));
		window.location.href = "nuevaOperacion.html";
	}
};
btnEditOperation.addEventListener("click", editOperations);


// boton de cancelar deberia volver a la pagina pricipal index. html (no funciona)


// const canceledEdit = () => {
// 	window.location.href = "index.html";
// };
// btnCanceledEdit.addEventListener("click", canceledEdit);