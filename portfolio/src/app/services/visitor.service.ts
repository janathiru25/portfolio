import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  private apiUrl = 'https://portfolio-backend-lndt.onrender.com';

  constructor(private http: HttpClient) {}

  addVisitor(visitor: any): Observable<any> {
    return this.http.post(this.apiUrl, visitor);
  }

  getVisitors(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

}