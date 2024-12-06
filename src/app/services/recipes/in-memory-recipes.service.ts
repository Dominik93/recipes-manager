import { Inject, Injectable } from '@angular/core';
import { Configuration, Recipe, RecipeContainer, RecipeDetails, RecipeInformation, RecipeProducts, RecipeProductsContainer } from '../../recipe'
import { of, Observable, delay } from 'rxjs';
import { RecipesService, VersionedContainer, VersionedResult } from './recipes.service';
import { LoggingService } from '../logging/logging';
import { AuthorizationService } from '../authorization/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class InMemoryRecipesService implements RecipesService {

  private configuration: Configuration = {
    "recipes": {
      "1": {
        "name": "Chicken with rice",
        "selected": true,
        "notes": {
          "enabled": true,
          "value": "Multiplier 1.3"
        },
        "tags": {
          "enabled": false,
          "values": []
        },
      }
    },
    "recipeVersions": {
      "1": 1
    },
    "recipeDetails": {
      "1": {
        "description": "Jakiś tekst",
        "imageUrl": "",
        "url": ""
      }
    },
    "recipeProdcuts": {
      "1": {
        "name": "Chicken with rice",
        "portions": 1,
        "selected": true,
        "products": [
          {
            "id": "1",
            "name": "Chicken",
            "quantity": {
              "base": 100,
              "portions": { 3: 2, 6: 3, 9: 4 }
            },
            "tag": "Meat",
            "selected": false,
            "unit": "g",
            "owned": { show: false, value: 0 },
            "scalable": true
          },
          {
            "id": "2",
            "name": "Rice",
            "quantity": {
              "base": 100,
              "portions": {}
            },
            "tag": "",
            "selected": false,
            "unit": "g",
            "owned": { show: false, value: 0 },
            "scalable": true
          },
          {
            "id": "3",
            "name": "Yogurt",
            "quantity": {
              "base": 1,
              "portions": {}
            },
            "tag": "Fridge",
            "selected": false,
            "unit": "sz",
            "owned": { show: false, value: 0 },
            "scalable": false
          }
        ]
      }

    }
  }

  private applicationToken: string = "";

  private authToken: string = ""

  constructor(@Inject('LoggingService') private log: LoggingService) {
  }

  init(authorizationService: AuthorizationService): void {
    authorizationService.getAuthorizationData().subscribe(value => {
      this.applicationToken = value.applicationToken || "";
      this.authToken = value.authToken || ""
    })
  }

  getRecipe(id: string): Observable<VersionedResult<Recipe>> {
    this.log.info("InMemoryRecipesService::getRecipe", this.authToken, this.applicationToken, id);
    const result = { version: this.configuration.recipeVersions[id], result: this.configuration.recipes[id] };
    this.log.info("InMemoryRecipesService::getRecipe completed", result);
    return of(result).pipe(delay(500));
  }

  getRecipeInfo(id: string): Observable<VersionedResult<RecipeInformation>> {
    this.log.info("InMemoryRecipesService::getRecipe", this.authToken, this.applicationToken, id);
    const info: RecipeInformation = {
      recipeDetails: this.configuration.recipeDetails[id],
      recipeProdcuts: this.configuration.recipeProdcuts[id],
      recipes: this.configuration.recipes[id]
    }
    const result = { version: this.configuration.recipeVersions[id], result: info };
    this.log.info("InMemoryRecipesService::getRecipe completed", result);
    return of(result).pipe(delay(500));
  }

  deleteRecipe(id: string): Observable<any> {
    this.log.info("InMemoryRecipesService::deleteRecipe", this.authToken, this.applicationToken);
    delete this.configuration.recipes[id];
    delete this.configuration.recipeVersions[id];
    delete this.configuration.recipeProdcuts[id];
    delete this.configuration.recipeDetails[id];
    this.log.info("InMemoryRecipesService::deleteRecipe completed");
    return of({}).pipe(delay(500));
  }

  getRecipesProducts(): Observable<VersionedContainer<RecipeProductsContainer>> {
    this.log.info("InMemoryRecipesService::getRecipesProducts", this.authToken, this.applicationToken);
    const result: VersionedContainer<RecipeProductsContainer> = {
      container: this.configuration.recipeProdcuts,
      versions: this.configuration.recipeVersions
    };
    this.log.info("InMemoryRecipesService::getRecipesProducts completed", result);
    return of(result).pipe(delay(500));
  }

  getRecipeVersion(id: string): Observable<number> {
    this.log.info("InMemoryRecipesService::getRecipeVersion", this.authToken, this.applicationToken, id);
    const version = this.configuration.recipeVersions[id];
    this.log.info("InMemoryRecipesService::getRecipeVersion completed", version);
    return of(version).pipe(delay(500));
  }

  getRecipeDetails(id: string): Observable<VersionedResult<RecipeDetails>> {
    this.log.info("InMemoryRecipesService::getRecipeDetails", this.authToken, this.applicationToken, id);
    const result = { version: this.configuration.recipeVersions[id], result: this.configuration.recipeDetails[id] };
    this.log.info("InMemoryRecipesService::getRecipeDetails completed", result);
    return of(result).pipe(delay(500));
  }

  getRecipeProducts(id: string): Observable<VersionedResult<RecipeProducts>> {
    this.log.info("InMemoryRecipesService::getRecipeProducts", this.authToken, this.applicationToken, id);
    const result = { version: this.configuration.recipeVersions[id], result: this.configuration.recipeProdcuts[id] };
    this.log.info("InMemoryRecipesService::getRecipeProducts completed", result);
    return of(result).pipe(delay(500));
  }

  getRecipes(): Observable<VersionedContainer<RecipeContainer>> {
    this.log.info("InMemoryRecipesService::getRecipes", this.authToken, this.applicationToken);
    const result: VersionedContainer<RecipeContainer> = {
      versions: this.configuration.recipeVersions,
      container: this.configuration.recipes
    };
    this.log.info("InMemoryRecipesService::getRecipes completed", result);
    return of(result).pipe(delay(500));
  }

  setSelectionRecipe(version: number, id: string, state: boolean, products: RecipeProducts): Observable<any> {
    this.log.info("InMemoryRecipesService::selectRecipe", this.authToken, this.applicationToken);
    this.configuration.recipeProdcuts[id] = products;
    this.configuration.recipes[id].selected = state;
    this.log.info("InMemoryRecipesService::selectRecipe completed");
    return of({}).pipe(delay(500));
  }

  save(version: number, id: string, recipe: Recipe, details: RecipeDetails, products: RecipeProducts): Observable<any> {
    this.log.info("InMemoryRecipesService::save", this.authToken, this.applicationToken);
    this.configuration.recipes[id] = recipe;
    this.configuration.recipeDetails[id] = details;
    this.configuration.recipeProdcuts[id] = products;
    this.configuration.recipeVersions[id] = version;
    this.log.info("InMemoryRecipesService::save completed");
    return of({}).pipe(delay(500));
  }

  saveRecipe(version: number, id: string, recipe: Recipe): Observable<any> {
    this.log.info("InMemoryRecipesService::saveRecipe", this.authToken, this.applicationToken);
    this.configuration.recipes[id] = recipe;
    this.configuration.recipeVersions[id] = version;
    this.log.info("InMemoryRecipesService::saveRecipe completed");
    return of({}).pipe(delay(500));
  }

  saveRecipeDetails(version: number, id: string, recipe: RecipeDetails): Observable<any> {
    this.log.info("InMemoryRecipesService::saveRecipeDetails", this.authToken, this.applicationToken);
    this.configuration.recipeDetails[id] = recipe;
    this.configuration.recipeVersions[id] = version;
    this.log.info("InMemoryRecipesService::saveRecipeDetails completed");
    return of({}).pipe(delay(500));
  }

  saveRecipeProducts(version: number, id: string, recipe: RecipeProducts): Observable<any> {
    this.log.info("InMemoryRecipesService::saveRecipeProducts", this.authToken, this.applicationToken);
    this.configuration.recipeProdcuts[id] = recipe;
    this.configuration.recipeVersions[id] = version;
    this.log.info("InMemoryRecipesService::saveRecipeProducts completed");
    return of({}).pipe(delay(500));
  }

}