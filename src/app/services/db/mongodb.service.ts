import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../../recipe';

@Injectable({
  providedIn: 'root'
})
export class MongodbService {

  private readonly COLLECTION = 'recipes';

  private readonly DATEBASE = 'recipes';

  private readonly DATA_SOURCE = 'Cluster0';

  constructor(private http: HttpClient) { }

  findOneDocument(url: string, token: string, applicationToken: string) {
    const headers = this.authHeader(token)
      .set('Content-Type', 'application/json')
      .set('Access-Control-Request-Headers', '*');
    return this.http.post(url,
      {
        ...this.connection(),
        "filter": { "token": applicationToken },
        "projection": { "recipes": 1, "version": 1 }
      },
      { headers: headers });
  }

  insertOneDocument(url: string, token: string, applicationToken: string, version: number, documents: Recipe[]) {
    const headers = this.authHeader(token)
      .set('Content-Type', 'application/ejson')
      .set('Accept', 'application/json');
    return this.http.post(url,
      {
        ...this.connection(),
        "document": { "token": applicationToken, "version": version, "recipes": documents }
      },
      { headers: headers });
  }

  updateOneDocument(url: string, token: string, applicationToken: string, version: number, documents: Recipe[]) {
    const headers = this.authHeader(token)
      .set('Content-Type', 'application/ejson')
      .set('Accept', 'application/json');
    return this.http.post(url,
      {
        ...this.connection(),
        "filter": { "token": applicationToken },

        "update": {
          "$set": {
            "version": version,
            "recipes": documents
          }
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
