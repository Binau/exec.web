import { Injectable, Injector } from '@angular/core'
import { HttpInterceptor } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class AuthInterceptorService implements HttpInterceptor{
  constructor(private injector: Injector) {}

  TOKEN_KEY = 'token';

  get token() {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  intercept(req, next) {
    if(!!this.token){
        let authRequest = req.clone({
          headers: req.headers.set('Authorization', this.token)
      })
      return next.handle(authRequest)
    }else{
      return next.handle(req)
    }

  }
}
