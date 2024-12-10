import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipesService } from './services/recipes/recipes.service';
import { AuthorizationService } from './services/authorization/authorization.service';
import { ProlongateTokenService } from './services/authorization/prolongate-token.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [
    {
      provide: 'AuthorizationService',
      useExisting: environment.authorizationService
    }
  ],
  templateUrl: `app.component.html`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(
    @Inject('RecipesService') private recipesService: RecipesService,
    private prolongateTokenService: ProlongateTokenService,
    @Inject('AuthorizationService') authorizationService: AuthorizationService) {
    this.recipesService.init(authorizationService);
    this.prolongateTokenService.init(authorizationService);
  }

}


