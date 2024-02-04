import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Authorization } from '../../authorization';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class MockAuthorizationService implements AuthorizationService {

  login(username: string, password: string, applicationToken: string): Observable<Authorization> {
    return of({
      applicationToken: applicationToken,
      authToken: "auth-token",
      refreshToken: "refresh-token"
    })
  }

  refresh(refreshToken: string): Observable<string> {
    return of(refreshToken);
  }

}
