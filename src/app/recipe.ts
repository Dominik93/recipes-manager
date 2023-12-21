export type Recipe = {
  name: string,
  selected: boolean,
  portions: number,
  products: Product[]
}

export type Product = {
  name: string,
  selected: boolean,
  quantity: number,
  quantityPerPortion: { [key: number]: number },
  unit: string
}

