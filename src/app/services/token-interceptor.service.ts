import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authSerivce = this.injector.get(TokenService);
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authSerivce.getToken()}`
      }
    })
    return next.handle(tokenizedReq);
  }
}
