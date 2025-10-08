import { UrlProvider } from './url-provider.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PythonUrlProvider implements UrlProvider {

  private readonly URL: string = 'https://dominik93.pythonanywhere.com';  //'http://127.0.0.1:5000';

  private readonly AUTH_PATH: string = '/api/auth/providers/local-userpass/login';

  private readonly REFRESH_PATH: string = '/api/auth/session';

  private readonly GET_PATH: string = '/api/data/v1/action/findOne';

  private readonly UPDATE_PATH: string = '/api/data/v1/action/updateOne';

  private readonly DELETE_PATH: string = '/api/data/v1/action/deleteOne';

  getAuth(): string {
    return this.URL;
  }

  getLogin(): string {
    return this.AUTH_PATH;
  }

  getRefresh(): string {
    return this.REFRESH_PATH;
  }

  getData(): string {
    return this.URL;
  }

  getFindOne(): string {
    return this.GET_PATH;
  }

  getUpdateOne(): string {
    return this.UPDATE_PATH;
  }

  getDeleteOne(): string {
    return this.DELETE_PATH;
  }

}
