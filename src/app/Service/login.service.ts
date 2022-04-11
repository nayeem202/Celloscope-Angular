import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any>{
    return this.http.post<any>('http://localhost:8080/login', data);
  }

  signup(data: any): Observable<any>{
    return this.http.post<any>('http://localhost:8080/save_user', data);
  }

  resetPassword(data: any): Observable<any>{
    return this.http.post<any>('http://localhost:8080/reset_password', data);
  }
  updatePassword(data: any): Observable<any>{
    return this.http.put<any>('http://localhost:8080/update_password', data);
  }
  
  

  
}