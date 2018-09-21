import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {

  

  private baseUrl = 'http://localhost:6994/api/';
  
  constructor(private http: HttpClient ) { }

  get<T>(url: string): Observable<T> {
       return this.http.get<T>(this.baseUrl + url) ;
  }
  getbyId<T>(url: string,id:any): Observable<T> {
    return this.http.get<T>(this.baseUrl + url+'/'+id) ;
}
  post<T>(url: string , data: any): Observable<T> {
    return this.http.post<T>(this.baseUrl + url, data) ;
  }

  put<T>(url: string , data: any): Observable<T> {
    return this.http.put<T>(this.baseUrl + url, data) ;
  }
  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(this.baseUrl + url) ;
  }
}