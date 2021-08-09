var getStorage = function () {
    var storageInfo = JSON.parse(localStorage.getItem('key-ahorradas'));
    if (!storageInfo) {
        storageInfo = {
            categories: [],
            operations: []
        };
    }
    return storageInfo;
};
//let storage = getStorage();
