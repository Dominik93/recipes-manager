import { Inject, Injectable } from '@angular/core';
import { LoggingService } from './logging/logging';
import { environment } from '../../environments/environment';

type StoredObject = {
  creationTime: number,
  object: any
}

@Injectable({
  providedIn: 'root'
})
export class ExpiringStorageService {

  private expiredTime: number = environment.config.expiringStorageConfig.expired * 60 * 1000;
  private refreshTime: number = environment.config.expiringStorageConfig.refresh * 60 * 1000;

  constructor(@Inject('LoggingService') private log: LoggingService) { }

  save(key: string, value: any) {
    const obj: StoredObject = { creationTime: Date.now(), object: value }
    this.log.trace("ExpiringStorageService::save", key, obj);
    localStorage.setItem(key, JSON.stringify(obj));
  }

  isExpired(key: string) {
    const obj: StoredObject = this.getObject(key);
    const expired = Date.now() - obj.creationTime > this.expiredTime;
    this.log.trace("ExpiringStorageService::isExpired", key, obj, expired);
    return expired;
  }

  needRefresh(key: string) {
    const obj: StoredObject = this.getObject(key);
    const refresh = Date.now() - obj.creationTime > this.refreshTime;
    this.log.trace("ExpiringStorageService::needRefresh", key, obj, refresh);
    return refresh;
  }

  get(key: string) {
    const obj = this.getObject(key).object;
    this.log.trace("ExpiringStorageService::get", key, obj);
    return obj;
  }

  delete(key: string) {
    localStorage.removeItem(key);
  }

  private getObject(key: string): StoredObject {
    const str: string | null = localStorage.getItem(key);
    if (str) {
      return JSON.parse(str);
    }
    return { creationTime: -1, object: null };
  }

}
