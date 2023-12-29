import { Inject, Injectable } from '@angular/core';
import { Recipe } from '../../recipe'
import { of, Observable, map } from 'rxjs';
import { RecipesService } from './recipes.service';
import { LoggingService } from '../logging/logging';

@Injectable({
  providedIn: 'root'
})
export class InMemoryRecipesService implements RecipesService {

  recipes: Recipe[] = [
    {
      "name": "Chicken with rice",
      "portions": 1,
      "notes": {
        "enabled": true,
        "value": "Multiplier 1.3"
      },
      "products": [
        {
          "name": "Chicken",
          "quantity": {
            "base": 100,
            "portions": { 3: 2, 6: 3, 9: 4 }
          },
          "selected": false,
          "unit": "g",
          "owned": { show: false, value: 0 }
        },
        {
          "name": "Rice",
          "quantity": {
            "base": 100,
            "portions": {}
          },
          "selected": false,
          "unit": "g",
          "owned": { show: false, value: 0 }
        },
        {
          "name": "Yogurt",
          "quantity": {
            "base": 1,
            "portions": {}
          },
          "selected": false,
          "unit": "sz",
          "owned": { show: false, value: 0 }
        }
      ],
      "selected": true
    }, {
      "name": "Avocado",
      "portions": 1,
      "notes": {
        "enabled": false,
        "value": ""
      },
      "products": [
        {
          "name": "Avocado",
          "quantity": {
            "base": 1,
            "portions": {}
          },
          "selected": false,
          "unit": "sz",
          "owned": { show: false, value: 0 }
        }
      ],
      "selected": false
    },
    {
      "name": "Pasta with chicken",
      "portions": 1,
      "notes": {
        "enabled": true,
        "value": "Own customizable note for this recipe"
      },
      "products": [
        {
          "name": "Chicken",
          "quantity": {
            "base": 200,
            "portions": {}
          },
          "selected": false,
          "unit": "g",
          "owned": { show: false, value: 0 }
        },
        {
          "name": "Chinese-style vegetable mix",
          "quantity": {
            "base": 200,
            "portions": {}
          },
          "selected": false,
          "unit": "g",
          "owned": { show: false, value: 0 }
        },
        {
          "name": "Pasta",
          "quantity": {
            "base": 50,
            "portions": {}
          },
          "selected": false,
          "unit": "g",
          "owned": { show: false, value: 0 }
        }
      ],
      "selected": false
    }
  ];

  version: number = 123;

  constructor(@Inject('LoggingService') private log: LoggingService) { }

  getRecipes(token: string): Observable<any> {
    this.log.info("InMemoryRecipesService::getRecipes", token);
    const result = { version: this.version, recipes: [...this.recipes] };
    this.log.info("InMemoryRecipesService::getRecipes completed", result);
    return of(result);
  }

  save(token: string, version: number, recipes: Recipe[]): Observable<any> {
    this.recipes = [...recipes];
    this.version = version;
    this.log.info("InMemoryRecipesService::save", token, version, recipes);
    this.log.info("InMemoryRecipesService::save completed");
    return of({});
  }

}