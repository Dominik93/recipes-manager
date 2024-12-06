import { Configuration, Recipe, RecipeContainer, RecipeDetails, RecipeInformation, RecipeProducts, RecipeProductsContainer, RecipeVersionsContainer } from '../../recipe'
import { Observable } from 'rxjs';
import { AuthorizationService } from '../authorization/authorization.service';

export type VersionedResult<T> = {
  version: number;
  result: T;
}

export type VersionedContainer<T> = {
  versions: RecipeVersionsContainer;
  container: T;
}

export interface RecipesService {

  init(authorizationService: AuthorizationService): void;

  getRecipes: () => Observable<VersionedContainer<RecipeContainer>>;

  deleteRecipe: (id: string) => Observable<void>;

  getRecipe: (id: string) => Observable<VersionedResult<Recipe>>;

  getRecipeInfo: (id: string) => Observable<VersionedResult<RecipeInformation>>;

  getRecipeDetails: (id: string) => Observable<VersionedResult<RecipeDetails>>;

  getRecipesProducts: () => Observable<VersionedContainer<RecipeProductsContainer>>;

  getRecipeProducts: (id: string) => Observable<VersionedResult<RecipeProducts>>;

  getRecipeVersion: (id: string) => Observable<number>;

  save: (version: number, id: string, recipe: Recipe, details: RecipeDetails, product: RecipeProducts) => Observable<void>;

  saveRecipe: (version: number, id: string, recipe: Recipe) => Observable<void>;

  saveRecipeDetails: (version: number, id: string, details: RecipeDetails) => Observable<void>;

  saveRecipeProducts: (version: number, id: string, products: RecipeProducts) => Observable<void>;

  setSelectionRecipe: (version: number, id: string, state: boolean, products: RecipeProducts) => Observable<void>;

}