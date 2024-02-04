import { Observable } from 'rxjs';
import { Authorization } from '../../authorization';

export interface AuthorizationService {

  login(username: string, password: string, applicationToken: string): Observable<Authorization>;
  
  refresh(refreshToken: string): Observable<string>;

}
