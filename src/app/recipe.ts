import { v4 as uuidv4 } from 'uuid';

export type Configuration = {
  recipes: RecipeContainer;
  recipeDetails: RecipeDetailsContainer;
  recipeProdcuts: RecipeProductsContainer;
  recipeVersions: RecipeVersionsContainer;
}

export type RecipeInformation = {
  recipes: Recipe;
  recipeDetails: RecipeDetails;
  recipeProdcuts: RecipeProducts;
}

export type RecipeContainer = { [key: string]: Recipe; }
export type RecipeVersionsContainer = { [key: string]: number; }
export type RecipeDetailsContainer = { [key: string]: RecipeDetails; }
export type RecipeProductsContainer = { [key: string]: RecipeProducts; }


export type Recipe = {
  name: string;
  selected: boolean;
  notes: Notes;
  tags: Tags;
}

export type Notes = {
  value: string;
}

export type Tags = {
  values: Tag[];
}

export type Tag = 'MEAT' | 'VEGE' | 'NONMOVABLE';

export type RecipeDetails = {
  description: string;
  imageUrl: string;
  url: string;
}

export type RecipeProducts = {
  name: string;
  selected: boolean;
  portions: number;
  expanded: boolean;
  products: Product[];
}

export type Product = {
  id: string;
  name: string;
  tag: string;
  selected: boolean;
  quantity: Quantity;
  unit: string;
  owned: Owned;
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

export const ALL_TAGS: Tag[] = ['MEAT', 'VEGE', 'NONMOVABLE'];

export const UNITS = ['g', 'sz'];

export function ID(): string {
  return uuidv4();
}

export function NEW_VERSION(): number {
  return Date.now();
}

export function EMPTY_PRODUCT(): Product {
  return {
    id: ID(),
    name: "",
    tag: "",
    quantity: { base: 1, portions: {} },
    selected: false,
    unit: UNITS[0],
    owned: { show: false, value: 0 },
    scalable: true
  }
}

export function EMPTY_RECIPE(): Recipe {
  return {
    name: "",
    notes: { value: '' },
    tags: { values: [] },
    selected: false
  };
}
export function EMPTY_DETAILS(): RecipeDetails {
  return {
    description: "",
    imageUrl: "",
    url: ""
  };
}

export function EMPTY_PRODUCTS(): RecipeProducts {
  return {
    name: "",
    selected: false,
    expanded: true,
    portions: 1,
    products: [],
  };
}