type LocalStorage = {
    categories?: Category[],
    operations?: Operation[]
 }
 
type Category = {
    id: number,
    nombre: string,
    slug: string
}
 
type Operation = {
    id: number,
    category: Category[],
    amount: number,
    description: string,
    date: Date,
    type: "Ganancia" | "Gasto" 
}

const getStorage = (): LocalStorage => {
    let storageInfo: LocalStorage = JSON.parse(
        localStorage.getItem("key-ahorradas"));

    if (!storageInfo) {
        storageInfo = {
            categories:[],
            operations:[]
        };
    }

    return storageInfo;
};

