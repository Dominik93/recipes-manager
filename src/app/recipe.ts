export type Recipe = {
  name: string,
  selected: boolean,
  portions: number,
  notes: Notes;
  products: Product[]
}

export type Notes = {
  enabled: boolean;
  value: string;
}

export type Product = {
  name: string,
  selected: boolean,
  quantity: Quantity,
  unit: string,
  owned: Owned
}

export type Owned = {
  value: number;
  show: boolean;
}

export type Quantity = {
  base: number;
  portions: { [key: number]: number };
}

