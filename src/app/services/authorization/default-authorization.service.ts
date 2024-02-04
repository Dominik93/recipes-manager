import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Authorization } from '../../authorization';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class DefaultAuthorizationService implements AuthorizationService {
  private readonly URL = 'https://realm.mongodb.com';
  private readonly AUTH_PATH = '/api/client/v2.0/app/data-zepaz/auth/providers/local-userpass/login';
  private readonly REFRESH_PATH = '/api/client/v2.0/auth/session';

  constructor(private http: HttpClient) { }

  login(username: string, password: string, applicationToken: string): Observable<Authorization> {
    return this.http.post(this.URL + this.AUTH_PATH, { username: username, password: password })
      .pipe(map((response: any) => ({
        applicationToken: applicationToken,
        authToken: response.access_token,
        refreshToken: response.refresh_token
      })))
  }

  refresh(refreshToken: string): Observable<string> {
    const headers = this.authHeader(refreshToken).set('Content-Type', 'application/json');
    return this.http.post(this.URL + this.REFRESH_PATH, {}, { headers: headers })
      .pipe(map((response: any) => (response.access_token)));
  }

  private authHeader(token: string) {
    return new HttpHeaders().set('Authorization', 'Bearer ' + token);
  }

}
