import { Inject, Injectable } from '@angular/core';
import { Recipe } from '../../recipe'
import { of, Observable, delay } from 'rxjs';
import { RecipesService } from './recipes.service';
import { LoggingService } from '../logging/logging';
import { MigrationMapper } from './migration-mapper';

@Injectable({
  providedIn: 'root'
})
export class InMemoryRecipesService implements RecipesService {

  recipes: Recipe[] = [
    {
      "name": "Chicken with rice",
      "details": {
        "description": "Prepare as you wish"
      },
      "portions": 1,
      "notes": {
        "enabled": true,
        "value": "Multiplier 1.3"
      },
      "tags": {
        "enabled": false,
        "values": []
      },
      "products": [
        {
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
      ],
      "selected": true
    }, {
      "name": "Avocado",
      "details": {
        "imageUrl": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      "portions": 1,
      "notes": {
        "enabled": false,
        "value": ""
      },
      "tags": {
        "enabled": true,
        "values": ['VEGE']
      },
      "products": [
        {
          "name": "Avocado",
          "quantity": {
            "base": 1,
            "portions": {}
          },
          "tag": "",
          "selected": false,
          "unit": "sz",
          "owned": { show: false, value: 0 },
          "scalable": true
        }
      ],
      "selected": false
    },
    {
      "name": "Pasta with chicken",
      "details": {
        "url": "www.sample.com"
      },
      "portions": 1,
      "notes": {
        "enabled": true,
        "value": "Own customizable note for this recipe"
      },
      "tags": {
        "enabled": false,
        "values": []
      },
      "products": [
        {
          "name": "Chicken",
          "quantity": {
            "base": 200,
            "portions": {}
          },
          "tag": "Meat",
          "selected": false,
          "unit": "g",
          "owned": { show: false, value: 0 },
          "scalable": true
        },
        {
          "name": "Chinese-style vegetable mix",
          "quantity": {
            "base": 200,
            "portions": {}
          },
          "tag": "Fridge",
          "selected": false,
          "unit": "g",
          "owned": { show: false, value: 0 },
          "scalable": true
        },
        {
          "name": "Pasta",
          "quantity": {
            "base": 50,
            "portions": {}
          },
          "tag": "",
          "selected": false,
          "unit": "g",
          "owned": { show: false, value: 0 },
          "scalable": true
        }
      ],
      "selected": false
    }
  ];

  version: number = 123;

  constructor(@Inject('LoggingService') private log: LoggingService) { }

  getRecipes(authToken: string, applicationToken: string): Observable<any> {
    this.log.info("InMemoryRecipesService::getRecipes", authToken, applicationToken);
    const result = { version: this.version, recipes: MigrationMapper.migrate([...this.recipes]) };
    this.log.info("InMemoryRecipesService::getRecipes completed", result);
    return of(result).pipe(delay(500));
  }

  save(authToken: string, applicationToken: string, version: number, recipes: Recipe[]): Observable<any> {
    this.recipes = [...recipes];
    this.version = version;
    this.log.info("InMemoryRecipesService::save", authToken, applicationToken, version, recipes);
    this.log.info("InMemoryRecipesService::save completed");
    return of({}).pipe(delay(500));
  }

}