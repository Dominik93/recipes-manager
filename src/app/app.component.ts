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
import { MatTabsModule } from '@angular/material/tabs';
import { tap } from 'rxjs';
import { LoggingService } from './services/logging/logging';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from './notification/notification.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    MatIconModule,
    MatTabsModule,
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
  version: any;
  recipes: Recipe[] = [];

  constructor(
    @Inject('LoggingService') private log: LoggingService,
    @Inject('RecipesService') private recipesService: RecipesService,
    private snackBar: MatSnackBar) { }

  onLogin(event: any): void {
    this.authorized = event.isAuth;
    this.token = event.token
    this.recipesService.getRecipes(this.token)
      .pipe(tap(result => this.log.info('Recipes', result)))
      .subscribe((result: any) => {
        this.version = result.version;
        this.recipes = result.recipes;
      });
  }

  onRecipeSelected(event: any) {
    this.recipes = [...event];
    this.log.info('AppComponent::onRecipeSelected Save recipes on recipe selected', this.recipes);
    this.save();
  }

  onRecipeAdded(event: any) {
    this.recipes = [...event];
    this.log.info('AppComponent::onRecipeAdded Save recipes on recipe added', this.recipes);
    this.save();
  }

  onRecipeDeleted(event: any) {
    this.recipes = [...event];
    this.log.info('AppComponent::onRecipeDeleted Save recipes on recipe deleted', this.recipes);
    this.save();
  }

  onRecipeModified(event: any) {
    this.recipes = [...event];
    this.log.info('AppComponent::onRecipeModified Save recipes on recipe modified', this.recipes);
    this.save();
  }

  onProductChanged(event: any) {
    this.log.info('AppComponent::onProductChanged Save recipes on product changed', this.recipes);
    this.save();
  }

  onRefresh() {
    this.refresh(() => this.showNotification("Page refreshed."));
  }

  private save() {
    this.recipesService.getRecipes(this.token).subscribe((result) => {
      if (result.version != this.version) {
        this.handleVersionMismatch(result.version, this.version);
      } else {
        this.version = Date.now().valueOf();
        this.recipesService.save(this.token, this.version, this.recipes).subscribe(() => { });
      }
    })
  }

  private handleVersionMismatch(storedVersion: number, version: number) {
    this.log.info('AppComponent::handleVersionMismatch Version mismatch', storedVersion, version);
    this.refresh(() => this.showNotification("Version mismatch. Try again."));
  }

  private refresh(notification: Function) {
    this.recipesService.getRecipes(this.token)
      .pipe(tap(result => this.log.info('AppComponent::refresh', result)))
      .subscribe((result: any) => {
        this.version = result.version;
        this.recipes = result.recipes;
        notification();
      });
  }

  private showNotification(message: string): void {
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: 5000,
      data: message
    });
  }

}
