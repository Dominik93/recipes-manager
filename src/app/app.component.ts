import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { SelectedPipe } from './pipes/selected.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { QuantityPipe } from './pipes/quantity.pipe';
import { RecipesService } from './services/recipes.service'
import { Recipe } from './recipe'
import { AuthorizationComponent } from './components/authorization/authorization.component'
import { CartComponent } from './components/cart/cart.component'
import { RecipesComponent } from './components/recipes/recipes.component'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    AuthorizationComponent,
    RecipesComponent,
    CartComponent],
  providers: [],
  templateUrl: `app.component.html`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  authorized: boolean = false;
  recipes: Recipe[] = [];

  constructor(private recipesService: RecipesService) { }

  onLogin(event: any): void {
    console.log('onLogin', event)
    this.authorized = event.isAuth;
    this.recipesService.getRecipes().subscribe((result: Recipe[]) => this.recipes = result);
  }

  onRecipeSelected(event: any) {
    console.log('onRecipeSelected', event);
    this.recipes = [...event];
  }

}
