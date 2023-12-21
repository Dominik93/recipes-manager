export type Recipe = {
  name: string,
  selected: boolean,
  portions: number,
  products: Product[]
}

export type Product = {
  name: string,
  selected: boolean,
  quantity: Quantity,
  unit: string
}

export type Quantity = {
  base: number;
  portions: { [key: number]: number };
}

