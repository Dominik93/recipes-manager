import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Authorization } from './../../authorization'
import { AuthorizationService } from '../../services/authorization/authorization.service'
import { environment } from '../../../environments/environment';
import { AuthStorageService } from '../../services/auth-storage.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';

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
      useClass: environment.authorizationService
    }
  ],
  templateUrl: `authorization.component.html`,
  styleUrls: ['./authorization.component.css'],
})
export class AuthorizationComponent {

  @Output() login = new EventEmitter<Authorization>();

  applicationToken: string = "";

  username: string = "";

  password: string = "";

  rememberMe: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    @Inject('AuthorizationService') private authorizationService: AuthorizationService,
    private authStorageService: AuthStorageService) {
    this.applicationToken = this.activatedRoute.snapshot.queryParams['token'] ?? "";
  }

  onLogin(): void {
    if (this.username === "") {
      return;
    }
    if (this.password === "") {
      return;
    }
    if (this.applicationToken === "") {
      return;
    }
    this.authorizationService.login(this.username, this.password, this.applicationToken).subscribe((result) => {
      if (this.rememberMe) {
        this.authStorageService.save({ applicationToken: result.applicationToken, authToken: result.authToken, refreshToken: result.refreshToken })
      }
      this.login.emit(result);
    });
  }

}
