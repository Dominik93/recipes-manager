import { UrlProvider } from './url-provider.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/**
 * @deprecated Altas Mongodb API is now offline.
 */
export class MongodbUrlProvider implements UrlProvider {

  private readonly AUTH_URL = 'https://realm.mongodb.com';

  private readonly AUTH_PATH = '/api/client/v2.0/app/data-zepaz/auth/providers/local-userpass/login';

  private readonly REFRESH_PATH = '/api/client/v2.0/auth/session';

  private readonly DATA_URL = 'https://eu-central-1.aws.data.mongodb-api.com';

  private readonly GET_PATH = '/app/data-zepaz/endpoint/data/v1/action/findOne';

  private readonly UPDATE_PATH = '/app/data-zepaz/endpoint/data/v1/action/updateOne';

  private readonly DELETE_PATH = '/app/data-zepaz/endpoint/data/v1/action/deleteOne';

  getAuth(): string {
    return this.AUTH_URL;
  }
  
  getLogin(): string {
    return this.AUTH_PATH;
  }
  
  getRefresh(): string {
    return this.REFRESH_PATH;
  }
  
  getData(): string {
    return this.DATA_URL;
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
