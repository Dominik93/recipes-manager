import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RecipesService } from './services/recipes/recipes.service'
import { Recipe } from './recipe'
import { AuthorizationComponent } from './components/authorization/authorization.component'
import { CartComponent } from './components/cart/cart.component'
import { RecipesComponent } from './components/recipes/recipes.component'
import { MatCardModule } from '@angular/material/card';
import { tap } from 'rxjs';
import { LoggingService } from './services/logging/logging';


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

  constructor(@Inject('LoggingService') private log: LoggingService,
    @Inject('RecipesService') private recipesService: RecipesService) { }

  onLogin(event: any): void {
    this.authorized = event.isAuth;
    this.token = event.token
    this.recipesService.getRecipes(this.token)
      .pipe(tap(result => this.log.info('Recipes', result)))
      .subscribe((result: any) => this.recipes = result.recipes);
  }

  onRecipeSelected(event: any) {
    this.recipes = [...event];
    this.log.info('Save recipes on recipe selected', this.recipes)
    this.recipesService.save(this.token, this.recipes).subscribe(() => { });
  }

  onRecipeAdded(event: any) {
    this.recipes = [...event];
    this.log.info('Save recipes on recipe added', this.recipes)
    this.recipesService.save(this.token, this.recipes).subscribe(() => { });
  }

  onRecipeDeleted(event: any) {
    this.recipes = [...event];
    this.log.info('Save recipes on recipe deleted', this.recipes)
    this.recipesService.save(this.token, this.recipes).subscribe(() => { });
  }

  onRecipeModified(event: any) {
    this.recipes = [...event];
    this.log.info('Save recipes on recipe modified', this.recipes)
    this.recipesService.save(this.token, this.recipes).subscribe(() => { });
  }

  onProductChanged(event: any) {
    this.log.info('Save recipes on product changed', this.recipes)
    this.recipesService.save(this.token, this.recipes).subscribe(() => { });
  }

  onRefresh() {
    this.recipesService.getRecipes(this.token)
      .pipe(tap(result => this.log.info('Recipes on refresh', result)))
      .subscribe((result: any) => this.recipes = result.recipes);
  }

}
