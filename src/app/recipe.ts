export type Recipe = {
  name: string,
  selected: boolean,
  portions: number,
  multiplier: Multiplier;
  products: Product[]
}

export type Multiplier = {
  enabled: boolean;
  value: number;
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

