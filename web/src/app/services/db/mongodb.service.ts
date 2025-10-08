import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlProvider } from '../url/url-provider.service';

@Injectable({
  providedIn: 'root'
})
export class MongodbService {

  private readonly COLLECTION = 'recipes';

  private readonly DATABASE = 'recipes';

  private readonly DATA_SOURCE = 'Cluster0';

  constructor(private http: HttpClient,
    @Inject('UrlProvider') private urlProvider: UrlProvider) { }

  deleteOneDocument(token: string, applicationToken: string, documents: string[]): Observable<Object> {
    const headers = this.authHeader(token)
      .set('Content-Type', 'application/json')
      .set('Access-Control-Request-Headers', '*');
    const unset: any = {};
    documents.forEach(doc => unset[doc] = 1);
    return this.http.post(this.urlProvider.getData() + this.urlProvider.getUpdateOne(),
    {
      ...this.connection(),
      "filter": { "token": applicationToken },

      "update": {
        "$unset": unset
      }
    },
      { headers: headers });
  }

  findOneDocument(token: string, applicationToken: string, documents: string[]): Observable<Object> {
    const headers = this.authHeader(token)
      .set('Content-Type', 'application/json')
      .set('Access-Control-Request-Headers', '*');
    const projection: any = {};
    documents.forEach(doc => projection[doc] = 1);
    return this.http.post(this.urlProvider.getData() + this.urlProvider.getFindOne(),
      {
        ...this.connection(),
        "filter": { "token": applicationToken },
        "projection": projection
      },
      { headers: headers });
  }

  updateOneDocument(token: string, applicationToken: string, entries: { key: string, value: any }[]): Observable<Object> {
    const headers = this.authHeader(token)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    const set: any = {};
    entries.forEach(entry => set[entry.key] = entry.value)
    return this.http.post(this.urlProvider.getData() + this.urlProvider.getUpdateOne(),
      {
        ...this.connection(),
        "filter": { "token": applicationToken },

        "update": {
          "$set": set
        }
      },
      { headers: headers });
  }

  private authHeader(token: string) {
    return new HttpHeaders().set('Authorization', 'Bearer ' + token);
  }

  private connection() {
    return {
      "collection": this.COLLECTION,
      "database": this.DATABASE,
      "dataSource": this.DATA_SOURCE
    };
  }

}
