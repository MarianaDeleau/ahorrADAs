//##### SET TYPES / DEFINIR TIPOS ######
//##### READING LOCAL STORAGE / LEER EL STORAGE ######
var getStorage = function () {
    var storageInfo = JSON.parse(localStorage.getItem('key-ahorradas'));
    if (!storageInfo) {
        storageInfo = {
            categories: [{ id: 1, name: 'Comida' }, { id: 2, name: 'Educación' }, { id: 3, name: 'Salidas' }, { id: 4, name: 'Servicios' }, { id: 5, name: 'Trabajo' }, { id: 6, name: 'Transporte' }],
            operations: []
        };
    }
    return storageInfo;
};
//##### CREATE NODES FUNCTION / FUNCIOND PARA CREAR NODOS DE MANERA DINAMICA ######
var createNode = function (tag, attr) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    var elem = document.createElement(tag);
    for (var prop in attr) {
        if (prop === "data") {
            for (var dataElement in attr[prop]) {
                //console.log({dataElement, tag, prop})			
                elem.dataset[dataElement] = attr[prop][dataElement];
            }
        }
        else {
            elem.setAttribute(prop, attr[prop]);
        }
    }
    for (var _a = 0, children_1 = children; _a < children_1.length; _a++) {
        var child = children_1[_a];
        elem.appendChild(child);
    }
    return elem;
};
