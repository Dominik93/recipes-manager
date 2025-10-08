import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthorizationComponent } from '../components/authorization/authorization.component';
import { CartComponent } from '../components/cart/cart.component';
import { RecipesComponent } from '../components/recipes/recipes.component';
import { LoggingService } from '../services/logging/logging';
import { AuthorizationService } from '../services/authorization/authorization.service';
import { AuthStorageService } from '../services/auth-storage.service';
import { Authorization } from '../authorization';
import { RefreshComponent } from '../refresh/refresh.component';

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
  ],
  providers: [
    {
      provide: 'AuthorizationService',
      useExisting: environment.authorizationService
    }
  ],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent implements OnInit, OnDestroy {

  authorized: boolean = false;

  activeTabs: { [key: string]: boolean; } = { 'RECIPES': true, 'CART': false };

  private authorizationDataSubscription = Subscription.EMPTY;

  constructor(
    @Inject('LoggingService') private log: LoggingService,
    @Inject('AuthorizationService') private authorizationService: AuthorizationService,
    private authStorageService: AuthStorageService) {
  }

  ngOnInit(): void {
    this.authorizationDataSubscription = this.authorizationService.getAuthorizationData().subscribe(value => {
      this.authorized = value.authorized;
    })

    const token: Authorization = this.authStorageService.get();
    this.log.info('ManagerComponent::ngOnInit', token);
    if (token == null) {
      return;
    }
    if (this.authStorageService.isExpired()) {
      this.log.info('ManagerComponent::ngOnInit isExpired');
      this.expire();
    } else if (this.authStorageService.needRefresh()) {
      this.log.info('ManagerComponent::ngOnInit needRefresh');
      this.refreshSession(token);
    } else if (!!token) {
      this.log.info('ManagerComponent::ngOnInit restored');
      this.restoreSession(token);
    }
  }

  private expire(): void {
    this.authStorageService.delete();
  }

  private refreshSession(token: Authorization): void {
    this.authorizationService.refresh(token.refreshToken).subscribe(result => {
      this.authStorageService.save({ applicationToken: token.applicationToken, authToken: result, refreshToken: token.refreshToken });
      this.authorizationService.setAuthorizationData({
        authorized: true,
        rememberMe: true,
        applicationToken: token.applicationToken,
        authToken: result
      })
    });
  }

  private restoreSession(token: Authorization): void {
    this.authorizationService.setAuthorizationData({
      authorized: true,
      rememberMe: true,
      applicationToken: token.applicationToken,
      authToken: token.authToken
    })
  }

  onTabChange(event: MatTabChangeEvent): void {
    this.activeTabs = { 'RECIPES': event.index == 0, 'CART': event.index == 1 };
  }

  onLangaugeClick(lang: string): void {
    this.log.debug("ManagerComponent::onLangaugeClick", lang)
    window.location.href = environment.contextPath + "/" + lang;
  }

  ngOnDestroy(): void {
    this.authorizationDataSubscription.unsubscribe();
  }
}
