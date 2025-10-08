import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Authorization } from '../../authorization';
import { AuthorizationData, AuthorizationService } from './authorization.service';

@Injectable({ providedIn: 'root', })
export class MockAuthorizationService implements AuthorizationService {

  private _authorized: Subject<AuthorizationData> = new Subject<AuthorizationData>();

  authorized(): void {
    this._authorized.next({ authorized: true });
  }

  unauthorized(): void {
    this._authorized.next({ authorized: false });
  }

  getAuthorizationData(): Observable<AuthorizationData> {
    return this._authorized.asObservable();
  }

  setAuthorizationData(authorizationData: AuthorizationData): void {
    this._authorized.next(authorizationData);
  }

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
