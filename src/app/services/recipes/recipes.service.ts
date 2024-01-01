import { Recipe } from '../../recipe'
import { Observable } from 'rxjs';

export interface RecipesService {

  getRecipes: (authToken: string, applciationToken: string) => Observable<any>;

  save: (authToken: string, applciationToken: string, version: number, recipes: Recipe[]) => Observable<any>;

}
