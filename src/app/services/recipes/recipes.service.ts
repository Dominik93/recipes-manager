import { Recipe } from '../../recipe'
import { Observable } from 'rxjs';

export interface RecipesService {

  getRecipes: (token: string) => Observable<any>;

  save: (token: string, version: number, recipes: Recipe[]) => Observable<any>;

}
