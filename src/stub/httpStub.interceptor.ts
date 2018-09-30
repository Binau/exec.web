import {Injectable} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import {Observable} from 'rxjs';
import {StubConf} from './stub.conf';

@Injectable()
export class HttpStubInterceptor implements HttpInterceptor {

  private stubConf = new StubConf();

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    // Recuperation du stub correspondant à l'url
    const urlStub = this.stubConf.stubs.get(req.url);
    const stub = !!urlStub && urlStub.get(req.method);

    // Application du stub
    if (!!stub) return stub();

    // Sinon requete normale
    return next.handle(req);
  }
}
