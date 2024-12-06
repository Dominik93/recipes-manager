import { Injectable } from '@angular/core';
import { ExpiringStorageService } from './expiring-storage.service';
import { Authorization } from '../authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {

  private readonly KEY: string = "auth";

  constructor(private storageService: ExpiringStorageService) { }

  save(value: Authorization): void {
    this.storageService.save(this.KEY, value);
  }

  delete(): void {
    this.storageService.delete(this.KEY)
  }

  get(): Authorization {
    return this.storageService.get(this.KEY)
  }

  isExpired(): boolean {
    return this.storageService.isExpired(this.KEY)
  }

  needRefresh(): boolean {
    return this.storageService.needRefresh(this.KEY)
  }

}
