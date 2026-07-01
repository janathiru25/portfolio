import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

 private apiUrl = 'https://portfolio-backend-lndt.onrender.com/api/contact';
 
  constructor(private http: HttpClient) {}

  // Send Contact Message
  sendMessage(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // Get All Contact Messages
  getMessages(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

}