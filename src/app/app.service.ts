import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private apiUrl = 'https://ask01.onrender.com/api';
  
  constructor(private http: HttpClient) {}
  
  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/findall`);
  }
  postData(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post<any>(`${this.apiUrl}/save`, data, { headers });
  }
}
