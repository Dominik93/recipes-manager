import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RecipesService } from './services/recipes.service'
import { Recipe } from './recipe'
import { AuthorizationComponent } from './components/authorization/authorization.component'
import { CartComponent } from './components/cart/cart.component'
import { RecipesComponent } from './components/recipes/recipes.component'
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    MatIconModule,
    MatCardModule,

    AuthorizationComponent,
    RecipesComponent,
    CartComponent],
  providers: [],
  templateUrl: `app.component.html`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  authorized: boolean = false;
  token: string = "";
  recipes: Recipe[] = [];

  constructor(private recipesService: RecipesService) { }

  onLogin(event: any): void {
    this.authorized = event.isAuth;
    this.token = event.token
    this.recipesService.getRecipes(this.token).subscribe((result: any) => this.recipes = result.recipes);
  }

  onRecipeSelected(event: any) {
    this.recipes = [...event];
    this.recipesService.save(this.token, this.recipes)
      .subscribe(() => { });
  }
 
  onProductChanged(event: any) {
    this.recipesService.save(this.token, this.recipes)
      .subscribe(() => { });
  }
  
  onRefresh() {
    this.recipesService.getRecipes(this.token).subscribe((result: any) => this.recipes = result.recipes);
  }

}
