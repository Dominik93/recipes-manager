import { Injectable } from '@angular/core';
import { VersionedResult } from './recipes/recipes.service';

@Injectable({
  providedIn: 'root'
})
export class Versionservice {

  public mismatchVersion(storedVersion: number, version: number): boolean {
    return storedVersion != version
  }

  public handleVersion(result: VersionedResult<any>) {
    if (!result.version) {
      window.location.reload();
    }
  }


}
