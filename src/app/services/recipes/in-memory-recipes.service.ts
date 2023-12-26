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
      "name": "Kurczak z ryżem",
      "portions": 1,
      "products": [
        {
          "name": "Kurczak",
          "quantity": {
            "base": 100,
            "portions": { 3: 2, 6: 3, 9: 4 }
          },
          "selected": false,
          "unit": "g",
          "owned": { show: false, value: 0 }
        },
        {
          "name": "Ryż",
          "quantity": {
            "base": 100,
            "portions": {}
          },
          "selected": false,
          "unit": "g",
          "owned": { show: false, value: 0 }
        },
        {
          "name": "Jogurt",
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
      "name": "Awokado",
      "portions": 1,
      "products": [
        {
          "name": "Awokado",
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
      "name": "Kurczak z makaronem",
      "portions": 1,
      "products": [
        {
          "name": "Kurczak",
          "quantity": {
            "base": 200,
            "portions": {}
          },
          "selected": false,
          "unit": "g",
          "owned": { show: false, value: 0 }
        }, 
        {
          "name": "Mieszanka warzyw po chińsku",
          "quantity": {
            "base": 200,
            "portions": {}
          },
          "selected": false,
          "unit": "g",
          "owned": { show: false, value: 0 }
        },
        {
          "name": "Makaron",
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
  ]

  getRecipes(token: string): Observable<any> {
    return of({ recipes: this.recipes });
  }

  save(token: string, recipes: Recipe[]): Observable<any> {
    this.recipes = recipes;
    return of({ recipes: this.recipes });
  }

}