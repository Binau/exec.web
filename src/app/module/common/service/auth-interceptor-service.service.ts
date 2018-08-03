import { Injectable, Injector } from '@angular/core'
import { HttpInterceptor } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorServiceService implements HttpInterceptor{
  constructor(private injector: Injector) {}

  TOKEN_KEY = 'token';

  get token() {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  intercept(req, next) {

      let authRequest = req.clone({
          headers: req.headers.set('Authorization', 'token ' + this.token)
      })
      return next.handle(authRequest)
  }
}
