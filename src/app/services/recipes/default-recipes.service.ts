import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Recipe } from '../../recipe'
import { of, Observable, map } from 'rxjs';
import { MongodbService } from '../db/mongodb.service';
import { RecipesService } from './recipes.service';

@Injectable({
  providedIn: 'root'
})
export class DefaultRecipesService implements RecipesService {

  private readonly NAME = "app-1";

  private readonly URL = 'https://eu-central-1.aws.data.mongodb-api.com';

  private readonly GET_PATH = '/app/data-zepaz/endpoint/data/v1/action/findOne';

  private readonly UPDATE_PATH = '/app/data-zepaz/endpoint/data/v1/action/updateOne';

  constructor(private mongodb: MongodbService) { }

  getRecipes(token: string): Observable<any> {
    return this.mongodb.findOneDocument(this.URL + this.GET_PATH, token, this.NAME)
      .pipe(map((response: any) => ({
        version: response.document.version,
        recipes: response.document.recipes
      })));
  }

  save(token: string, version: number, recipes: Recipe[]): Observable<any> {
    return this.mongodb.updateOneDocument(this.URL + this.UPDATE_PATH, token, this.NAME, version, recipes)
  }



}
