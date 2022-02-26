import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { User } from '../components/models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrlLogin = `http://localhost:4566/login`;
  private apiUrlLoginHistory = `http://localhost:4566/loginHistory`;

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrlLogin}`, user);
  }

  createLoginHistory(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrlLoginHistory}`, user);
  }
}
