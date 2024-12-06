import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root', })
export class RefreshService {

  private _refreshed: Subject<number> = new Subject<number>();

  private counter = 0

  refresh(): void {
    this.counter++;
    this._refreshed.next(this.counter);
  }

  getRefresh(): Observable<number> {
    return this._refreshed.asObservable();
  }

}
