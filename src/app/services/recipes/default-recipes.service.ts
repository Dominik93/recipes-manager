import { Injectable } from '@angular/core';
import { Recipe } from '../../recipe'
import { Observable, map } from 'rxjs';
import { MongodbService } from '../db/mongodb.service';
import { RecipesService } from './recipes.service';
import { MigrationMapper } from './migration-mapper';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DefaultRecipesService implements RecipesService {

  private readonly URL = 'https://eu-central-1.aws.data.mongodb-api.com';

  private readonly GET_PATH = '/app/data-zepaz/endpoint/data/v1/action/findOne';

  private readonly UPDATE_PATH = '/app/data-zepaz/endpoint/data/v1/action/updateOne';

  constructor(private mongodb: MongodbService) { }

  getRecipes(authToken: string, applicationToken: string): Observable<any> {
    return this.mongodb.findOneDocument(this.URL + this.GET_PATH, authToken, applicationToken)
      .pipe(map((response: any) => (this.mapRecipesResponse(response))));
  }

  save(authToken: string, applicationToken: string, version: number, recipes: Recipe[]): Observable<any> {
    return this.mongodb.updateOneDocument(this.URL + this.UPDATE_PATH, authToken, applicationToken, version, recipes)
  }

  mapRecipesResponse(response: any) {
    const document = response.docuemnt;
    return {
      version: document?.version,
      recipes: MigrationMapper.migrate(document?.recipes ?? [])
    }
  }

}
