import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipe';

@Injectable({
  providedIn: 'root'
})
export class MongodbService {

  private readonly COLLECTION = 'recipes';

  private readonly DATEBASE = 'recipes';

  private readonly DATA_SOURCE = 'Cluster0';

  constructor(private http: HttpClient) { }

  findOneDocument(url: string, token: string, name: string) {
    const headers = this.authHeader(token)
      .set('Content-Type', 'application/json')
      .set('Access-Control-Request-Headers', '*');
    return this.http.post(url,
      {
        ...this.connection(),
        "filter": { "name": name },
        "projection": { "recipes": 1 }
      },
      { headers: headers });
  }

  insertOneDocument(url: string, token: string, name: string, documents: Recipe[]) {
    const headers = this.authHeader(token)
      .set('Content-Type', 'application/ejson')
      .set('Accept', 'application/json');
    return this.http.post(url,
      {
        ...this.connection(),
        "document": { "name": name, "recipe": documents }
      },
      { headers: headers });
  }

  updateOneDocument(url: string, token: string, name: string, documents: Recipe[]) {
    const headers = this.authHeader(token)
      .set('Content-Type', 'application/ejson')
      .set('Accept', 'application/json');
    return this.http.post(url,
      {
        ...this.connection(),
        "filter": { "name": name },

        "update": {
          "$set": {
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
