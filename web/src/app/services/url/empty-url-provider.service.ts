import { UrlProvider } from './url-provider.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmptyUrlProvider implements UrlProvider {

  getAuth(): string {
    return "";
  }

  getLogin(): string {
    return "";
  }

  getRefresh(): string {
    return "";
  }

  getData(): string {
    return "";
  }

  getFindOne(): string {
    return "";
  }

  getUpdateOne(): string {
    return "";
  }

  getDeleteOne(): string {
    return "";
  }

}
