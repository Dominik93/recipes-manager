import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Authorization } from '../../authorization';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class DefaultAuthorizationService implements AuthorizationService {

  private readonly URL = 'https://realm.mongodb.com';
  private readonly AUTH_PATH = '/api/client/v2.0/app/data-zepaz/auth/providers/local-userpass/login';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<Authorization> {
    return this.http.post(this.URL + this.AUTH_PATH, { username: username, password: password })
      .pipe(map((response: any) => ({
        isAuth: true,
        token: response.access_token
      })))
  }

}
