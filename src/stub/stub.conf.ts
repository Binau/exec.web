import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {execData} from './data/exec.data';
import {Observable, of, throwError} from 'rxjs';
import {delay} from 'rxjs/operators';

/**
 * Class permettant de configurer les bouchons
 */
export class StubConf {

  public constructor() {
    this.loadDatas();
  }

  // Url => Method => response
  public stubs: Map<string, Map<string, () => Observable<any>>> = new Map<string, Map<string, () => Observable<any>>>();

  public loadDatas() {
    this
      .stubGet('rest/execs/simple-java', execData, 500);
    //.stubGet404('rest/tests', 1000);


  }

  // Error
  public stubGet404(url: string, timeout?: number): this {
    return this.stubError(url, 'GET', 404, 'Not Found');
  }

  public stubError(url: string, method: string, status: number, message: string, timeout?: number) {
    if (!this.stubs.has(url)) {
      this.stubs.set(url, new Map<string, () => any>());
    }
    this.stubs.get(url).set(method, () => this.error(status, message, timeout));
    return this;
  }

  public error(status: number, message: string, timeout?: number): Observable<any> {
    let observable = throwError(new HttpErrorResponse({status: status, statusText: message}));

    if (!!timeout) {
      observable = observable.pipe(delay(timeout));
    }

    return observable;
  }

  // Data
  public stubGet(url: string, data: any, timeout?: number): this {
    return this.stub(url, 'GET', data, timeout);
  }

  public stub(url: string, method: string, data: any, timeout?: number) {
    if (!this.stubs.has(url)) {
      this.stubs.set(url, new Map<string, () => any>());
    }
    this.stubs.get(url).set(method, () => this.data(data, timeout));
    return this;
  }

  public data(body: any, timeout?: number): Observable<any> {
    let observable = of(new HttpResponse({status: 200, body: body}));

    if (!!timeout) {
      observable = observable.pipe(delay(timeout));
    }

    return observable;
  }

}
