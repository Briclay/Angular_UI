
import {throwError as observableThrowError, Observable} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse, HttpParams } from "@angular/common/http";
import {constantService} from "../constant/constant.serive";
import { jspAppGlobal } from '../app.globlal';

export let API_BASE = "/";

@Injectable()
  export class ApiService {
  // URLs to web api

  constructor(private http: HttpClient) { }

  public get(url: string, query?: {[id: string]: string}, responseType?): Observable<any> {
    let reqUrl = `${API_BASE}${url}`;
    let httpParams: HttpParams = undefined;

    if (query) {
      httpParams = new HttpParams();
      for (const key in query) {
        httpParams = httpParams.append(key, query[key]);
      }
    }

    let runRequest = (retries: number): Observable <any> => {
      return this.http.get(reqUrl, {params: httpParams, responseType: responseType}).pipe(
        map(response => response),
        catchError((error) => {
          if (retries > 0) {
            console.error("Request error! Retry... " + reqUrl);
            retries -= 1;
            return runRequest(retries);
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
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };

    return this.http
      .post(reqUrl, body, headersOptions).pipe(
      map(res => res),
      catchError((errorResp) => {
        return this.handleError(errorResp);
      }),);
  }

  public put(url: string, bodyObj: any = {}, responseType?): Observable<any> {
    let reqUrl = `${API_BASE}${url}`;
    let body = JSON.stringify(bodyObj);

    const headersOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };

    return this.http
      .put(reqUrl, body, headersOptions).pipe(
      map(res => res),
      catchError((errorResp) => {
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
