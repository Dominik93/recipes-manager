import { Observable, map, tap } from 'rxjs';
import { Authorization } from '../../authorization';

export interface AuthorizationService {

  login(username: string, password: string): Observable<Authorization>;

}
