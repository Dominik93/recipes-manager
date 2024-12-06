import { Observable } from 'rxjs';
import { Authorization } from '../../authorization';

export type AuthorizationData = {
  authorized: boolean;
  rememberMe?: boolean;
  authToken?: string;
  applicationToken?: string;
}

export interface AuthorizationService {

  authorized(): void;

  unauthorized(): void;

  setAuthorizationData(authorizationData: AuthorizationData): void;

  getAuthorizationData(): Observable<AuthorizationData>;

  login(username: string, password: string, applicationToken: string): Observable<Authorization>;

  refresh(refreshToken: string): Observable<string>;

}
