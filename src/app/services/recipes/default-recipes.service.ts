import { Injectable } from '@angular/core';
import { Recipe } from '../../recipe'
import { Observable, map, tap } from 'rxjs';
import { MongodbService } from '../db/mongodb.service';
import { RecipesService } from './recipes.service';
import { MigrationMapper } from './migration-mapper';
import { AuthStorageService } from '../auth-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DefaultRecipesService implements RecipesService {

  private readonly URL = 'https://eu-central-1.aws.data.mongodb-api.com';

  private readonly GET_PATH = '/app/data-zepaz/endpoint/data/v1/action/findOne';

  private readonly UPDATE_PATH = '/app/data-zepaz/endpoint/data/v1/action/updateOne';

  constructor(private mongodb: MongodbService, private authStorageService: AuthStorageService) { }

  getRecipes(authToken: string, applicationToken: string): Observable<any> {
    return this.mongodb.findOneDocument(this.URL + this.GET_PATH, authToken, applicationToken)
      .pipe(tap((response: any) => {
        if (response.document === null) {
          this.authStorageService.delete();
        }
      }))
      .pipe(map((response: any) => (this.mapRecipesResponse(response))));
  }

  save(authToken: string, applicationToken: string, version: number, recipes: Recipe[]): Observable<any> {
    return this.mongodb.updateOneDocument(this.URL + this.UPDATE_PATH, authToken, applicationToken, version, recipes)
  }

  mapRecipesResponse(response: any) {
    const document = response.document;
    return {
      version: document?.version,
      recipes: MigrationMapper.migrate(document?.recipes ?? [])
    }
  }

}
