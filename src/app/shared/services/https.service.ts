/* eslint-disable prefer-const */
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpContext,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpsService {
  backendServiceURL = '';
  private headers = new HttpHeaders({});
  private isInitialized = false;

  constructor(private http: HttpClient) {
    this.setupTokenListener();
  }

    sendPostRequestAuth<T>(
    endpoint: string,
    body?: any,
    useXsrf: boolean = false
  ): Observable<T> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Optional: Add XSRF token header from cookies (if needed)
    // const xsrfToken = this.cookieService.getItem('XSRF-TOKEN');
    // if (useXsrf && xsrfToken) headers = headers.set('X-XSRF-TOKEN', xsrfToken);

    return this.http.post<T>(
      `${this.backendServiceURL}${endpoint}`,
      body ?? null,
      { headers, withCredentials: true }
    );
  }

  private setupTokenListener() {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      this.updateHeaders(token);
    }
  }

  private updateHeaders(token: any) {
    if (token && token.access_token) {
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.access_token}`,
      });
    }
  }

  private convertObjectaToHttpParams(queryParams: any): HttpParams {
    let httpParams = new HttpParams();
    if (!queryParams) {
      return httpParams;
    }
    for (const key in queryParams) {
      let value = queryParams[key];
      if (value == null) {
        continue;
      }
      httpParams = httpParams.set(key, value);
    }
    return httpParams;
  }

  sendGetRequest(
    url: string,
    queryParams?: any,
    headers?: boolean,
    responseType?: any
  ): Observable<any> {
    let httpParams = this.convertObjectaToHttpParams(queryParams);
    if (headers) {
      return this.http.get(url, {
        headers: this.headers,
        params: httpParams,
        responseType: responseType,
      });
    } else {
      return this.http.get(url, { params: httpParams });
    }
  }

  sendGetRequestWithHeaders(
    url: string,
    headers: HttpHeaders,
    queryParams?: any,
    responseType?: any
  ): Observable<any> {
    let httpParams = this.convertObjectaToHttpParams(queryParams);
    return this.http.get(url, {
      headers: headers,
      params: httpParams,
      responseType: responseType,
    });
  }

  sendDeleteRequest(
    url: string,
    queryParams?: any,
    body?: any
  ): Observable<any> {
    const httpParams = this.convertObjectaToHttpParams(queryParams);
    return this.http.delete(url, { params: httpParams, body: body });
  }

  sendPutRequest(url: string, data?: any, headers?: boolean): Observable<any> {
    if (headers) {
      return this.http.put(url, data, { headers: this.headers });
    } else {
      return this.http.put(url, data);
    }
  }


  sendPostRequest(
    url: string,
    data?: any,
    useHeaders: boolean = true,
    responseType: 'json' | 'text' = 'json'
  ): Observable<any> {
    const options: any = {};

    if (useHeaders) {
      options.headers = this.headers;
    }

    // Set responseType
    if (responseType === 'text') {
      options.responseType = 'text';
    }

    return this.http.post<any>(url, data, options);
  }

  sendPostRequestWithOptions(
    url: string,
    data?: any,
    headers?: boolean,
    responseType?: any,
    options?: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      context?: HttpContext;
      observe?: 'body';
      params?:
        | HttpParams
        | {
            [param: string]:
              | string
              | number
              | boolean
              | ReadonlyArray<string | number | boolean>;
          };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Observable<any> {
    if (options) {
      return this.http.post(url, data, options);
    }
    if (headers) {
      return this.http.post(url, data, {
        headers: this.headers,
        responseType: responseType,
      });
    } else {
      return this.http.post(url, data);
    }
  }
}
