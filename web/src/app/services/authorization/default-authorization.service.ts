import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, map } from 'rxjs';
import { Authorization } from '../../authorization';
import { AuthorizationData, AuthorizationService } from './authorization.service';
import { UrlProvider } from '../url/url-provider.service';

@Injectable({ providedIn: 'root', })
export class DefaultAuthorizationService implements AuthorizationService {

  private _authorized: Subject<AuthorizationData> = new Subject<AuthorizationData>();

  constructor(private http: HttpClient,
        @Inject('UrlProvider') private urlProvider: UrlProvider
  ) { }

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
    return this.http.post(this.urlProvider.getAuth() + this.urlProvider.getLogin(), { username: username, password: password })
      .pipe(map((response: any) => ({
        applicationToken: applicationToken,
        authToken: response.access_token,
        refreshToken: response.refresh_token
      })))
  }

  refresh(refreshToken: string): Observable<string> {
    const headers = this.authHeader(refreshToken).set('Content-Type', 'application/json');
    return this.http.post(this.urlProvider.getAuth() + this.urlProvider.getRefresh(), {}, { headers: headers })
      .pipe(map((response: any) => (response.access_token)));
  }

  private authHeader(token: string) {
    return new HttpHeaders().set('Authorization', 'Bearer ' + token);
  }

}
