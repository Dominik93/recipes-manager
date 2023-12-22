import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { Authorization } from './../../authorization'
import { AuthorizationService } from '../../services/authorization/authorization.service'
import { environment } from '../../../environments/environment';

@Component({
  selector: 'rm-authorization',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule],
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

  authorized: boolean = false;

  username: string = "";

  password: string = "";

  constructor(@Inject('AuthorizationService') private authorizationService: AuthorizationService) { }

  onLogin(): void {
    this.authorizationService.login(this.username, this.password).subscribe((result) => {
      this.login.emit(result);
      this.authorized = result.isAuth;
    });
  }

}
