
export interface UrlProvider {

  getAuth(): string

  getLogin(): string

  getRefresh(): string

  getData(): string

  getFindOne(): string

  getUpdateOne(): string

  getDeleteOne(): string

}
