
import {throwError as observableThrowError, Observable} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { jspAppGlobal } from '../app.globlal';
import { Router } from '@angular/router';

export let API_BASE = "";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // URLs to web api
  
  token : any;

  constructor(private http: HttpClient,
    private router: Router) { 
  }

  public get(url: string, query?: {[id: string]: string}, responseType?): Observable<any> {
    let reqUrl = `${API_BASE}${url}`;
    let httpParams: HttpParams = undefined;

    if (query) {
      httpParams = new HttpParams();
      for (const key in query) {
        httpParams = httpParams.append(key, query[key]);
      }
    }

    const headersOptions = new HttpHeaders({ 
      "Authorization" : JSON.parse(window.localStorage.getItem('authToken')),
      "Content-Type": "application/json"
    })

    let runRequest = (retries: number): Observable <any> => {
      return this.http.get(reqUrl, {params: httpParams, responseType: responseType, 
        headers: headersOptions
    }).pipe(
        map(response => response),
        catchError((error) => {
          console.log(error, 'error - getcall')
          if (retries > 0) {
            console.error("Request error! Retry... " + reqUrl);
            retries -= 1;
            return runRequest(retries);
          }

          if(error.message  === "Invalid/Expired token"){
            const path = '/login'
            this.router.navigate([path]);
          }
          return this.handleError(error);
        }),);
    };
    return runRequest(2);
  }

  public post(url: string, bodyObj: any = {}, responseType?): Observable<any> {
    let reqUrl = `${API_BASE}${url}`;
    let body = JSON.stringify(bodyObj);

    const headersOptions = {
      headers: new HttpHeaders({ 
        "Content-Type": "application/json",
        "Authorization" : JSON.parse(window.localStorage.getItem('authToken')) ? JSON.parse(window.localStorage.getItem('authToken')) : ""
      })
    };

    return this.http
      .post(reqUrl, body, headersOptions).pipe(
      map(res => res),
      catchError((errorResp) => {
        console.log(errorResp, 'error - postcall')
        if(errorResp.message  === "Invalid/Expired token"){
          const path = '/login'
          this.router.navigate([path]);
        }
        return this.handleError(errorResp);
      }),);
  }

  public put(url: string, bodyObj: any = {}, responseType?): Observable<any> {
    let reqUrl = `${API_BASE}${url}`;
    let body = JSON.stringify(bodyObj);

    const headersOptions = {
      headers: new HttpHeaders({ 
        "Content-Type": "application/json" ,
        "Authorization" : JSON.parse(window.localStorage.getItem('authToken'))
      })
    };

    return this.http
      .put(reqUrl, body, headersOptions).pipe(
      map(res => res),
      catchError((errorResp) => {
        if(errorResp.message  === "Invalid/Expired token"){
          const path = '/login'
          this.router.navigate([path]);
        }
        return this.handleError(errorResp);
      }));
  }

  public delete(url: string, bodyObj: any = {}, responseType?): Observable<any> {
    let reqUrl = `${API_BASE}${url}`;
    let body = JSON.stringify(bodyObj);

    const headersOptions = {
      headers: new HttpHeaders({ 
        "Content-Type": "application/json" ,
        "Authorization" : JSON.parse(window.localStorage.getItem('authToken'))
      })
    };

    return this.http
      .put(reqUrl, headersOptions).pipe(
      map(res => res),
      catchError((errorResp) => {
        if(errorResp.message  === "Invalid/Expired token"){
          const path = '/login'
          this.router.navigate([path]);
        }
        return this.handleError(errorResp);
      }));
  }


   public putFile(url: string, bodyObj: any = {}, fileHeader?): Observable<any> {
    let reqUrl = `${API_BASE}${url}`;
    let body = JSON.stringify(bodyObj);
    return this.http
      .put(reqUrl, bodyObj, fileHeader).pipe(
      map(res => res),
      catchError((errorResp) => {
        if("Invalid/Expired token"  === "Invalid/Expired token"){
          const path = '/login'
          this.router.navigate([path]);
        }
        return this.handleError(errorResp);
      }));
  }

  private handleError(errorResp) {
    if(errorResp instanceof HttpErrorResponse) {
      if(errorResp.error) {
        return Observable.create(observer => {
            observer.error({status: errorResp.status, message: errorResp.error.message, error: errorResp.error.error});
          });
      }
    }

    return observableThrowError(new Error(errorResp));
  }


}
