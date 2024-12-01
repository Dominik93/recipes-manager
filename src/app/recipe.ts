export type Recipe = {
  name: string,
  details: Details,
  selected: boolean,
  portions: number,
  notes: Notes,
  products: Product[],
  tags: Tags,
}

export type Details = {
  url?: string,
  imageUrl?: string,
  description?: string,
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
  tag: string,
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


export function EMPTY_RECIPE() {
  return {
    name: "",
    details: {},
    portions: 1,
    notes: { enabled: false, value: '' },
    products: [],
    tags: { enabled: false, values: [] },
    selected: false
  };

}