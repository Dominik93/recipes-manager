import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, interval, tap } from 'rxjs';
import { RecipesService } from './services/recipes/recipes.service'
import { Recipe } from './recipe'
import { AuthorizationComponent } from './components/authorization/authorization.component'
import { CartComponent } from './components/cart/cart.component'
import { RecipesComponent } from './components/recipes/recipes.component'
import { LoggingService } from './services/logging/logging';
import { NotificationComponent } from './notification/notification.component';
import { TimePipe } from './pipes/time.pipe';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    MatIconModule,
    MatTabsModule,
    MatToolbarModule,

    AuthorizationComponent,
    RecipesComponent,
    CartComponent,

    TimePipe
  ],
  providers: [],
  templateUrl: `app.component.html`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  authorized: boolean = false;
  recipes: Recipe[] = [];
  countdown: number = environment.config.refresh.countdown;
  enableRefresh: boolean = environment.config.refresh.enabled;

  private pageRefreshed = $localize`:page-refreshed@@page-refreshed:Page refreshed.`;
  private versionMismatch = $localize`:version-mismatch@@version-mismatch:Version mismatch. Try again.`;
  private authToken: string = "";
  private applicationToken: string = "";
  private version: any;
  private subscriptions: Subscription[] = [];

  constructor(
    @Inject('LoggingService') private log: LoggingService,
    @Inject('RecipesService') private recipesService: RecipesService,
    private snackBar: MatSnackBar) { }

  onLogin(event: any): void {
    this.authorized = event.isAuth;
    this.authToken = event.authToken
    this.applicationToken = event.applicationToken;
    this.recipesService.getRecipes(this.authToken, this.applicationToken)
      .pipe(tap(result => this.log.info('AppComponent::onLogin Recipes', result)))
      .pipe(tap(result => this.handleVersion(result)))
      .subscribe((result: any) => {
        this.version = result.version;
        this.recipes = result.recipes;
      });
    if (this.enableRefresh) {
      const timer = interval(1000).subscribe(() => {
        this.countdown--;
        if (this.countdown === 0) {
          this.refresh()
        }
      });
      this.subscriptions.push(timer);
    }
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
    this.refresh(() => this.showNotification(this.pageRefreshed));
  }

  onLangaugeClick(lang: string) {
    this.log.debug("AppComponent::onLangaugeClick", lang)
    window.location.href = environment.contextPath + "/" + lang;
  }

  private save() {
    this.recipesService.getRecipes(this.authToken, this.applicationToken)
      .pipe(tap(result => this.handleVersion(result)))
      .subscribe((result) => {
        if (result.version != this.version) {
          this.handleVersionMismatch(result.version, this.version);
        } else {
          this.version = Date.now().valueOf();
          this.countdown = environment.config.refresh.countdown;
          this.recipesService.save(this.authToken, this.applicationToken, this.version, this.recipes).subscribe(() => { });
        }
      })
  }

  private handleVersionMismatch(storedVersion: number, version: number) {
    this.log.info('AppComponent::handleVersionMismatch Version mismatch', storedVersion, version);
    this.refresh(() => this.showNotification(this.versionMismatch));
  }

  private refresh(notification: Function = () => { }) {
    this.recipesService.getRecipes(this.authToken, this.applicationToken)
      .pipe(tap(result => this.log.info('AppComponent::refresh', result)))
      .pipe(tap(result => this.handleVersion(result)))
      .subscribe((result: any) => {
        this.countdown = environment.config.refresh.countdown;
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

  private handleVersion(result: any) {
    if (!result.version) {
      window.location.reload();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

}
