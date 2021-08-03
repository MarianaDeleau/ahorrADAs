type LocalStorage = {
    categories?: Category[]
    gasto?: Gastos[]
    ganancia?: Ganancias[]
 }
 
type Category = {
    id: number,
    nombre: string,
    slug: string
}
 
type Gastos = {
    id: number,
    category: Category[],
    amount: number,
    description: string,
    date: Date
}

type Ganancias = {
    id: number,
    category: Category[],
    amount: number,
    description: string,
    date: Date
}
