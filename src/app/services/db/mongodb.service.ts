import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MongodbService {

  private readonly URL = 'https://eu-central-1.aws.data.mongodb-api.com';

  private readonly GET_PATH = '/app/data-zepaz/endpoint/data/v1/action/findOne';

  private readonly UPDATE_PATH = '/app/data-zepaz/endpoint/data/v1/action/updateOne';

  private readonly DELTE_PATH = '/app/data-zepaz/endpoint/data/v1/action/deleteOne';

  private readonly COLLECTION = 'recipes';

  private readonly DATEBASE = 'recipes';

  private readonly DATA_SOURCE = 'Cluster0';

  constructor(private http: HttpClient) { }

  deleteOneDocument(token: string, applicationToken: string, documents: string[]): Observable<Object> {
    const headers = this.authHeader(token)
      .set('Content-Type', 'application/json')
      .set('Access-Control-Request-Headers', '*');
    const unset: any = {};
    documents.forEach(doc => unset[doc] = 1);
    return this.http.post(this.URL + this.UPDATE_PATH,
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
    return this.http.post(this.URL + this.GET_PATH,
      {
        ...this.connection(),
        "filter": { "token": applicationToken },
        "projection": projection
      },
      { headers: headers });
  }

  updateOneDocument(token: string, applicationToken: string, entries: { key: string, value: any }[]): Observable<Object> {
    const headers = this.authHeader(token)
      .set('Content-Type', 'application/ejson')
      .set('Accept', 'application/json');
    const set: any = {};
    entries.forEach(entry => set[entry.key] = entry.value)
    return this.http.post(this.URL + this.UPDATE_PATH,
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
      "database": this.DATEBASE,
      "dataSource": this.DATA_SOURCE
    };
  }

}
