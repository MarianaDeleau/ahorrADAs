type LocalStorage = {
    categories?: Category[],
    operaciones?: Operaciones[]
 }
 
type Category = {
    id: number,
    nombre: string,
    slug: string
}
 
type Operaciones = {
    id: number,
    category: Category[],
    amount: number,
    description: string,
    date: Date,
    type: "Ganancia" | "Gasto" 
}



