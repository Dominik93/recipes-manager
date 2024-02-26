export type Recipe = {
  name: string,
  selected: boolean,
  portions: number,
  notes: Notes,
  products: Product[],
  tags: Tags,
}

export type Notes = {
  enabled: boolean;
  value: string;
}

export type Tags = {
  enabled: boolean;
  values: Tag[];
}

export type Tag = 'VEGE' | 'NONMOVABLE';

export type Product = {
  name: string,
  selected: boolean,
  quantity: Quantity,
  unit: string,
  owned: Owned,
  scalable: boolean
}

export type Owned = {
  value: number;
  show: boolean;
}

export type Quantity = {
  base: number;
  portions: { [key: number]: number };
}

