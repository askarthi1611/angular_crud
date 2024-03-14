import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // private apiUrl = 'https://ask01.onrender.com/api';
  private apiUrl = 'http://localhost:3000/api';
  
  constructor(private http: HttpClient) {}
  
  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/findall`);
  }
  postData(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/save`, data, { headers });
  }
  postpdfData(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/savepdf`, data, { headers });
  }
  // UpdateData(data: any): Observable<any> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.post<any>(`${this.apiUrl}/update`, data, { headers });
  // }
  UpdateData(newObj: any) {
    console.log(newObj);
    const url = `${this.apiUrl}/update`; // Replace 'update' with your update endpoint
    return this.http.post(url, newObj).pipe(
      catchError((error) => {
        console.error('Error updating data:', error);
        return throwError(error); // Rethrow the error to propagate it further
      })
    );
  }
  deleteResource(id: any): Observable<any> {
    let num : any= {'StudentId':id}
    return this.http.post<any>(`${this.apiUrl}/delete`,num);   
  }
}
