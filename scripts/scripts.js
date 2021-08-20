//##### LEER EL STORAGE ######
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
//##### CREAR NODOS DE MANERA DINAMICA ######
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
//{"categories":[{"id":1,"name":"Educación"},{"id":2,"name":"Comida"},{"id":3,"name":"Trabajo"},{"id":4,"name":"Servicios Públicos"}],"operations":[{"id":4,"category":"Trabajo","amount":"200000","description":"Sueldo IT","date":"2021-08-05","type":"Ganancia"},{"id":7,"category":"Educación","amount":"35000","description":"Colegio","date":"2021-08-05","type":"Gasto"},{"id":9,"category":"Servicios Públicos","amount":"2000","description":"Gas","date":"2021-08-05","type":"Gasto"},{"id":10,"category":"Trabajo","amount":"25000","description":"Viaticos","date":"2021-08-15","type":"Gasto"},{"id":11,"category":"Educación","amount":"35000","description":"Colegio","date":"2021-07-05","type":"Gasto"},{"id":12,"category":"Trabajo","amount":"150000","description":"Sueldo","date":"2021-07-07","type":"Ganancia"},{"id":13,"category":"Comida","amount":"8000","description":"Supermercado","date":"2021-07-14","type":"Gasto"},{"id":14,"category":"Comida","amount":"7500","description":"Supermercado","date":"2021-08-04","type":"Gasto"},{"id":15,"category":"Comida","amount":"13000","description":"Supermercado","date":"2021-06-15","type":"Gasto"},{"id":16,"category":"Trabajo","amount":"150000","description":"Sueldo","date":"2021-05-05","type":"Ganancia"},{"id":17,"category":"Trabajo","amount":"250000","description":"Sueldo/Bono","date":"2020-12-01","type":"Ganancia"}]}
