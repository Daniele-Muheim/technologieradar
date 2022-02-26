import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private decodedToken: any;

  constructor() { }

  public saveToken(token: string): any {
    try {
      sessionStorage.setItem('token', token);
    } catch (error) {
      // invalid token format
    }
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  get isLoggedIn(): boolean {
    let token = sessionStorage.getItem('token');
    return (token !== null) ? true : false;
  }

  public logout(): void {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("expires_at");
  }

  getUsername(): any {
    try {
      this.decodedToken = jwt_decode(this.getToken()!);
      const decodedTokenValue = JSON.parse(JSON.stringify(this.decodedToken));
      return decodedTokenValue["email"];
    } catch (error) {
      // invalid token format
    }
  }

  getUserRoleAdmin(): any {
    try {
      this.decodedToken = jwt_decode(this.getToken()!);
      const decodedTokenValue = JSON.parse(JSON.stringify(this.decodedToken));
      if (decodedTokenValue["role"] == 'CTO' || decodedTokenValue["role"] == 'Tech-Lead') {
        return decodedTokenValue["role"];
      }
    } catch (error) {
      // invalid token format
    }
  }
}
