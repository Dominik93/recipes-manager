import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthorizationService } from '../../services/authorization/authorization.service'
import { environment } from '../../../environments/environment';
import { AuthStorageService } from '../../services/auth-storage.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';
import { LoggingService } from '../../services/logging/logging';
import * as sha512 from 'js-sha512';

@Component({
  selector: 'rm-authorization',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ],
  providers: [
    {
      provide: 'AuthorizationService',
      useExisting: environment.authorizationService
    }
  ],
  templateUrl: `authorization.component.html`,
  styleUrls: ['./authorization.component.css'],
})
export class AuthorizationComponent {

  applicationToken: string = "";

  username: string = "";

  password: string = "";

  rememberMe: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    @Inject('LoggingService') private log: LoggingService,
    @Inject('AuthorizationService') private authorizationService: AuthorizationService,
    private authStorageService: AuthStorageService) {
    this.applicationToken = this.activatedRoute.snapshot.queryParams['token'] ?? "";
  }

  onLogin(): void {
    this.log.debug("AuthorizationComponent::onLogin", this.username, this.applicationToken, this.rememberMe);
    if (this.username === "") {
      return;
    }
    if (this.password === "") {
      return;
    }
    if (this.applicationToken === "") {
      return;
    }
    this.authorizationService.login(this.username, sha512.sha512(this.password), this.applicationToken).subscribe((result) => {
      this.log.debug("AuthorizationComponent::onLogin", result);
      if (this.rememberMe) {
        this.authStorageService.save({
          applicationToken: result.applicationToken,
          authToken: result.authToken,
          refreshToken: result.refreshToken
        })
      }
      this.authorizationService.setAuthorizationData({
        authorized: true,
        applicationToken: result.applicationToken,
        authToken: result.authToken,
        rememberMe: this.rememberMe
      })
    });
  }

}
