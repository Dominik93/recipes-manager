import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Recipe } from './recipe'
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  recipes = [
    {
      name: 'Kurczak z ryżem',
      selected: true,
      portions: 2,
      products: [
        {name: 'Kurczak', selected: true, quantity: 100, unit: 'g'},
        {name: 'Czostnek', selected: true, quantity: 1, unit: 'sz'},
        {name: 'Ryż', selected: true, quantity: 100, unit: 'g'}
      ]
    },
    {
      name: 'Ryż z ciecieżcą',
      selected: true,
      portions: 3,
      products: [
        {name: 'Ciecieżyca', selected: true, quantity: 200, unit: 'sz'},
        {name: 'Ryż', selected: true, quantity: 100, unit: 'g'}
      ]
    },
    {
      name: 'Makaron z szynką',
      selected: false,
      portions: 1,
      products: [
        {name: 'Makaron', selected: false, quantity: 200, unit: 'g'},
        {name: 'Pesto', selected: false, quantity: 1, unit: 'sz'},
        {name: 'Szynka',  selected: false, quantity: 150, unit: 'g'}
      ]
    }
  ];

  constructor() { }

  getRecipes(): Observable<Recipe[]> {
    return of(this.recipes);
  }

}
