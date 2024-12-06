import { Inject, Injectable } from '@angular/core';
import { Recipe, RecipeContainer, RecipeDetails, RecipeInformation, RecipeProducts, RecipeProductsContainer } from '../../recipe'
import { Observable, map, tap } from 'rxjs';
import { MongodbService } from '../db/mongodb.service';
import { RecipesService, VersionedContainer, VersionedResult } from './recipes.service';
import { AuthStorageService } from '../auth-storage.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { LoggingService } from '../logging/logging';

@Injectable({
  providedIn: 'root'
})
export class DefaultRecipesService implements RecipesService {

  readonly recipeTemplate = "configuration.recipes.{id}";

  readonly recipeSelectedTemplate = "configuration.recipes.{id}.selected";

  readonly recipeVersionTemplate = "configuration.recipeVersions.{id}";

  readonly productsTemplate = "configuration.recipeProdcuts.{id}";

  readonly detailsTemplate = "configuration.recipeDetails.{id}";

  readonly recipiesTemplate = "configuration.recipes";

  readonly recipiesDetailsTemplate = "configuration.recipeDetails";

  readonly recipiesProductsTemplate = "configuration.recipeProdcuts";

  readonly versionsTemplate = "configuration.recipeVersions";

  private applicationToken: string = "";

  private authToken: string = "";

  private authorized: boolean = false;

  constructor(
    @Inject('LoggingService') private log: LoggingService,
    private mongodb: MongodbService,
    private authStorageService: AuthStorageService) {
  }

  init(authorizationService: AuthorizationService): void {
    authorizationService.getAuthorizationData().subscribe(value => {
      this.applicationToken = value.applicationToken || "";
      this.authToken = value.authToken || ""
      this.authorized = value.authorized;
    })
  }

  getRecipes(): Observable<VersionedContainer<RecipeContainer>> {
    return this.findAny([this.recipiesTemplate, this.versionsTemplate],
      (response) => {
        return {
          container: response.document.configuration?.recipes || {},
          versions: response.document.configuration?.recipeVersions || {}
        }
      }
    )
  }

  deleteRecipe(id: string): Observable<any> {
    return this.deleteAny([
      this.makePath(this.recipeTemplate, id),
      this.makePath(this.recipeVersionTemplate, id),
      this.makePath(this.detailsTemplate, id),
      this.makePath(this.productsTemplate, id)
    ]);
  }

  getRecipe(id: string): Observable<VersionedResult<Recipe>> {
    return this.findAny([this.makePath(this.recipeVersionTemplate, id), this.makePath(this.recipeTemplate, id)],
      (response) => {
        return {
          version: response.document.configuration?.recipeVersions[id],
          result: response.document.configuration?.recipes[id]
        }
      }
    )
  }

  getRecipeInfo(id: string): Observable<VersionedResult<RecipeInformation>> {
    return this.findAny([
      this.makePath(this.recipeTemplate, id),
      this.makePath(this.recipeVersionTemplate, id),
      this.makePath(this.detailsTemplate, id),
      this.makePath(this.productsTemplate, id)],
      (response) => {
        const result: RecipeInformation = {
          recipeDetails: response.document.configuration?.recipeDetails[id],
          recipeProdcuts: response.document.configuration?.recipeProdcuts[id],
          recipes: response.document.configuration?.recipes[id]
        }
        return {
          version: response.document.configuration?.recipeVersions[id],
          result: result
        }
      }
    )
  }

  getRecipeDetails(id: string): Observable<VersionedResult<RecipeDetails>> {
    return this.findAny([this.makePath(this.recipeVersionTemplate, id), this.makePath(this.detailsTemplate, id)],
      (response) => {
        return {
          version: response.document.configuration?.recipeVersions[id],
          result: response.document.configuration?.recipeDetails[id]
        }
      }
    )
  }

  getRecipesProducts(): Observable<VersionedContainer<RecipeProductsContainer>> {
    return this.findAny([this.recipiesProductsTemplate, this.versionsTemplate],
      (response) => {
        return {
          versions: response.document.configuration?.recipeVersions || {},
          container: response.document.configuration?.recipeProdcuts || {}
        }
      }
    )
  }

  getRecipeProducts(id: string): Observable<VersionedResult<RecipeProducts>> {
    return this.findAny([this.makePath(this.recipeVersionTemplate, id), this.makePath(this.productsTemplate, id)],
      (response) => {
        return {
          version: response.document.configuration.recipeVersions[id],
          result: response.document.configuration.recipeProdcuts[id]
        }
      }
    )
  }

  getRecipeVersion(id: string): Observable<number> {
    return this.findAny([this.makePath(this.recipeVersionTemplate, id)],
      (response) => {
        return response.document.configuration.recipeVersions[id];
      }
    )
  }

  setSelectionRecipe(version: number, id: string, state: boolean, products: RecipeProducts): Observable<void> {
    return this.saveAny([
      { key: this.makePath(this.recipeVersionTemplate, id), value: version },
      { key: this.makePath(this.productsTemplate, id), value: products },
      { key: this.makePath(this.recipeSelectedTemplate, id), value: state },
    ]);
  }

  save(version: number, id: string, recipe: Recipe, details: RecipeDetails, product: RecipeProducts): Observable<void> {
    return this.saveAny([
      { key: this.makePath(this.recipeVersionTemplate, id), value: version },
      { key: this.makePath(this.productsTemplate, id), value: product },
      { key: this.makePath(this.detailsTemplate, id), value: details },
      { key: this.makePath(this.recipeTemplate, id), value: recipe }
    ]);
  }

  saveRecipe(version: number, id: string, recipe: Recipe): Observable<void> {
    return this.saveAny([
      { key: this.makePath(this.recipeVersionTemplate, id), value: version },
      { key: this.makePath(this.recipeTemplate, id), value: recipe }
    ]);
  }

  saveRecipeDetails(version: number, id: string, recipe: RecipeDetails): Observable<void> {
    return this.saveAny([
      { key: this.makePath(this.recipeVersionTemplate, id), value: version },
      { key: this.makePath(this.detailsTemplate, id), value: recipe }
    ]);
  }

  saveRecipeProducts(version: number, id: string, recipe: RecipeProducts): Observable<void> {
    return this.saveAny([
      { key: this.makePath(this.recipeVersionTemplate, id), value: version },
      { key: this.makePath(this.productsTemplate, id), value: recipe }
    ]);
  }

  private findAny(entries: string[], mapper: (response: any) => any): Observable<any> {
    if (!this.authorized) {
      throw Error("Not authorized")
    }
    return this.mongodb.findOneDocument(this.authToken, this.applicationToken, entries)
      .pipe(tap((response) => this.logResponse(response)))
      .pipe(tap((response) => this.handleEmptyDocument(response)))
      .pipe(map((response) => mapper(response)))
      .pipe(tap((response) => this.logMappedResponse(response)));
  }


  private deleteAny(entries: string[]): Observable<any> {
    if (!this.authorized) {
      throw Error("Not authorized")
    }
    this.log.debug("DefaultRecipesService::deleteAny delete: ", entries);
    return this.mongodb.deleteOneDocument(this.authToken, this.applicationToken, entries)
  }

  private saveAny(entries: { key: string, value: any }[]): Observable<any> {
    if (!this.authorized) {
      throw Error("Not authorized")
    }
    this.log.debug("DefaultRecipesService:saveAny save: ", entries);
    return this.mongodb.updateOneDocument(this.authToken, this.applicationToken, entries)
  }

  private makePath(template: string, id: string): string {
    return template.replace("{id}", id);
  }

  private handleEmptyDocument(response: any): void {
    if (response.document === null) {
      this.authStorageService.delete();
    }
  }

  private logResponse(response: any): void {
    this.log.debug("DefaultRecipesService::logResponse response: ", response);
  }

  private logMappedResponse(response: any): void {
    this.log.debug("DefaultRecipesService::logMappedResponse response: ", response);
  }

}