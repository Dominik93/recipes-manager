import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../recipe';
import { Authorization } from '../authorization';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private authorizationSubject: Subject<Authorization> = new Subject<Authorization>();

  private recipesSubject: Subject<Recipe[]> = new Subject<Recipe[]>();

  setAuthorization(authorization: Authorization) {
    console.log('setAuthorization')
    this.authorizationSubject.next(authorization);
  }

  getAuthorization() {
    console.log('getAuthorization')
    return this.authorizationSubject.asObservable();
  }

  setRecipes(recipes: Recipe[]) {
    console.log('setRecipes')
    this.recipesSubject.next(recipes);
  }

  getRecipes() {
    console.log('getRecipes')
    return this.recipesSubject.asObservable();
  }

}
