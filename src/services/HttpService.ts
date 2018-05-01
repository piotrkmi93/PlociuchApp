import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class HttpService {

  protected api: string = 'http://localhost:3000/';

  private headers: any = {headers: new Headers({
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json'
    })};

  protected token: string = '';

  constructor(private http: Http)
  {
    this.reloadToken();
  }

  private reloadToken() {
    if ( !!localStorage.getItem('token') )
    {
      this.token = '?token=' + localStorage.getItem('token');
    }
  }

  private url(url: string): string
  {
    let _url = this.api + url;
    if(typeof this.token === 'string' && this.token.length){
      _url += '?token=' + this.token;
    }
    return _url;
  }

  public post(url: string, body: any, onSuccess, onError): void
  {
    const request =  this.http.post(
      this.url(url),
      body,
      this.headers
    ).subscribe(
      (response:any) => {
        const data = JSON.parse(response._body);
        onSuccess(data);
        request.unsubscribe();
      },
      (error:any) => {
        const data = JSON.parse(error._body);
        onError(data);
        request.unsubscribe();
      }
    );
  }

  // public get(url) {}
  // public put(url, body){}
  // public delete(url){}
}
