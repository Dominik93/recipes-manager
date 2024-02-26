import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, interval, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthorizationComponent } from '../components/authorization/authorization.component';
import { CartComponent } from '../components/cart/cart.component';
import { RecipesComponent } from '../components/recipes/recipes.component';
import { NotificationComponent } from '../notification/notification.component';
import { TimePipe } from '../pipes/time.pipe';
import { Recipe } from '../recipe';
import { LoggingService } from '../services/logging/logging';
import { RecipesService } from '../services/recipes/recipes.service';
import { AuthorizationService } from '../services/authorization/authorization.service';
import { AuthStorageService } from '../services/auth-storage.service';
import { ActivatedRoute } from '@angular/router';
import { Authorization } from '../authorization';
import { RefreshCounter, RefreshComponent } from '../refresh/refresh.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SpinnerDialogComponent } from '../components/spinner-dialog/spinner-dialog.component';

@Component({
  selector: 'app-manager',
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
    RefreshComponent,

    TimePipe
  ],
  providers: [
    {
      provide: 'AuthorizationService',
      useClass: environment.authorizationService
    }
  ],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent implements OnInit, OnDestroy {

  authorized: boolean = false;
  spinner: boolean = false;
  recipes: Recipe[] = [];
  counter: RefreshCounter = { countdown: environment.config.refresh.countdown };
  enableRefresh: boolean = environment.config.refresh.enabled;
  rememberMe: boolean = false;
  spinnerDialog: any;

  private pageRefreshed = $localize`:page-refreshed@@page-refreshed:Page refreshed.`;
  private versionMismatch = $localize`:version-mismatch@@version-mismatch:Version mismatch. Try again.`;
  private authToken: string = "";
  private applicationToken: string = "";
  private version: any;
  private subscriptions: Subscription[] = [];

  constructor(
    @Inject('LoggingService') private log: LoggingService,
    @Inject('RecipesService') private recipesService: RecipesService,
    @Inject('AuthorizationService') private authorizationService: AuthorizationService,
    private activatedRoute: ActivatedRoute,
    private authStorageService: AuthStorageService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) {
    this.applicationToken = this.activatedRoute.snapshot.queryParams['token'] ?? "";
  }

  ngOnInit() {
    const token = this.authStorageService.get();
    this.log.info('ManagerComponent::ngOnInit', token);

    if (this.authStorageService.isExpired()) {
      this.log.info('ManagerComponent::ngOnInit isExpired');
      this.authStorageService.delete();
    } else if (this.authStorageService.needRefresh()) {
      this.log.info('ManagerComponent::ngOnInit needRefresh');
      const token: Authorization = this.authStorageService.get();
      this.authorized = true;
      this.rememberMe = true;
      this.authToken = token.authToken;
      this.applicationToken = token.applicationToken;
      this.authorizationService.refresh(token.refreshToken).subscribe(result => {
        this.authStorageService.save({ applicationToken: this.applicationToken, authToken: result, refreshToken: token.refreshToken });
        this.authToken = result;
        this.refreshRecipes();
      });
    } else if (!!token) {
      this.log.info('ManagerComponent::ngOnInit restored');
      this.authorized = true;
      this.rememberMe = true;
      this.authToken = token.authToken;
      this.applicationToken = token.applicationToken;
      this.refreshRecipes();
    }
  }

  onLogin(event: any): void {
    this.log.info('ManagerComponent::onLogin', event);
    this.authorized = true;
    this.authToken = event.authToken;
    this.applicationToken = event.applicationToken;
    this.refreshRecipes();
    this.rememberMe = !!this.authStorageService.get();
  }

  onRecipeSelected(event: any) {
    this.openSpinner();
    this.recipes = [...event];
    this.log.info('ManagerComponent::onRecipeSelected Save recipes on recipe selected', this.recipes);
    this.prolongateToken(() => this.save());
  }

  onRecipeAdded(event: any) {
    this.openSpinner();
    this.recipes = [...event];
    this.log.info('ManagerComponent::onRecipeAdded Save recipes on recipe added', this.recipes);
    this.prolongateToken(() => this.save());
  }

  onRecipeDeleted(event: any) {
    this.openSpinner();
    this.recipes = [...event];
    this.log.info('ManagerComponent::onRecipeDeleted Save recipes on recipe deleted', this.recipes);
    this.prolongateToken(() => this.save());
  }

  onRecipeModified(event: any) {
    this.openSpinner();
    this.recipes = [...event];
    this.log.info('ManagerComponent::onRecipeModified Save recipes on recipe modified', this.recipes);
    this.prolongateToken(() => this.save());
  }

  onProductChanged(event: any) {
    this.openSpinner();
    this.log.info('ManagerComponent::onProductChanged Save recipes on product changed', this.recipes);
    this.prolongateToken(() => this.save());
  }

  onRefresh() {
    this.prolongateToken(() => this.refreshRecipes(
      () => environment.config.refresh.notify && this.showNotification(this.pageRefreshed)));
  }

  onLangaugeClick(lang: string) {
    this.log.debug("ManagerComponent::onLangaugeClick", lang)
    window.location.href = environment.contextPath + "/" + lang;
  }

  private prolongateToken(onRefreshed: Function) {
    this.log.debug("ManagerComponent::prolongateToken remember me", this.rememberMe)
    if (!this.rememberMe) {
      onRefreshed();
      return;
    }

    if (this.authStorageService.isExpired()) {
      this.log.debug("ManagerComponent::prolongateToken isExpired")
      this.authStorageService.delete();
      this.authorized = false;
    } else if (this.authStorageService.needRefresh()) {
      this.log.debug("ManagerComponent::prolongateToken needRefresh")
      const token: Authorization = this.authStorageService.get();
      this.authorizationService.refresh(token.refreshToken).subscribe(result => {
        this.authStorageService.save({ applicationToken: token.applicationToken, authToken: result, refreshToken: token.refreshToken });
        onRefreshed();
      });
    } else {
      this.log.debug("ManagerComponent::prolongateToken execute")
      onRefreshed();
    }
  }

  private save() {
    this.recipesService.getRecipes(this.authToken, this.applicationToken)
      .pipe(tap(result => this.handleVersion(result)))
      .subscribe((result) => {
        if (result.version != this.version) {
          this.handleVersionMismatch(result.version, this.version);
        } else {
          this.version = Date.now().valueOf();
          this.counter = { countdown: environment.config.refresh.countdown };
          this.recipesService.save(this.authToken, this.applicationToken, this.version, this.recipes).subscribe(() => {
            this.closeSpinner();
          });
        }
      })
  }

  private handleVersionMismatch(storedVersion: number, version: number) {
    this.log.info('ManagerComponent::handleVersionMismatch Version mismatch', storedVersion, version);
    this.closeSpinner();
    this.refreshRecipes(() => this.showNotification(this.versionMismatch));
  }

  private refreshRecipes(notification: Function = () => { }) {
    this.recipesService.getRecipes(this.authToken, this.applicationToken)
      .pipe(tap(result => this.log.info('ManagerComponent::refreshRecipes', result)))
      .pipe(tap(result => this.handleVersion(result)))
      .subscribe((result: any) => {
        this.counter = { countdown: environment.config.refresh.countdown };
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

  private openSpinner() {
    this.spinner = true;
    setTimeout(() => {
      if(this.spinner) {
        this.spinnerDialog = this.dialog.open(SpinnerDialogComponent, { disableClose: true });
      }
    }, environment.config.spinner.waitTime);
  }

  private closeSpinner() {
    this.spinner = false;
    this.spinnerDialog?.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
