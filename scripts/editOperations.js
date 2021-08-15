//##### Funcion para editar operaciones #####
// boton a de filters creado por nodos
var btnEditOperation = document.getElementById("editLink");
//input dexcripcion de nueva operacion 
var inputDescription = document.getElementById("descriptionOp");
//botones de nuevaOperacion.html
var btnCanceledEdit = document.getElementById("btnCancelOp");
var btnAddOperation = document.getElementById("btnAddOp");
// ver como agregar la nueva descripcion de la operacion ??????
var paramsUrl = new URLSearchParams(window.location.search);
var idUrl = parseInt(paramsUrl.get("id"));
var editOperations = function (e) {
    e.preventDefault();
    var input = inputDescription.value;
    if (input != "") {
        var storageAux = getStorage();
        for (var i = 0; i < storageAux.operations.length; i++) {
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
