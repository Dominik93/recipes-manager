import { Injectable } from '@angular/core';
import { ExpiringStorageService } from './expiring-storage.service';
import { Authorization } from '../authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {

  private readonly KEY: string = "auth";

  constructor(private storageService: ExpiringStorageService) { }

  save(value: Authorization) {
    this.storageService.save(this.KEY, value);
  }

  delete() {
    this.storageService.delete(this.KEY)
  }

  get(): Authorization {
    return this.storageService.get(this.KEY)
  }

  isExpired() {
    return this.storageService.isExpired(this.KEY)
  }

  needRefresh() {
    return this.storageService.needRefresh(this.KEY)
  }

}
