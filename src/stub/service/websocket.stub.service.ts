import {Injectable} from '@angular/core';
import {WebsocketClient} from '../../app/module/common/service/websocket.service';
import {ExecLog, ExecParam} from '../../app/module/exec/api/exec.api';
import {Observable, Observer} from 'rxjs';

class WebsocketStubClient extends WebsocketClient<ExecParam, ExecLog> {

  public internalStub: Observer<ExecLog>;

  constructor() {
    super();
    this.observable = Observable.create((obs: Observer<ExecLog>) => {
      this.internalStub = obs;
    });
    this.observer = {
      next: (data: ExecParam) => {
        console.log('Stub ws recoit : ', data);
      },
      error: (err: any) => {
      },
      complete: () => {
      }
    };
  }


}

@Injectable()
export class WebsocketStubService {

  constructor() {
  }

  public async connect(url: string): Promise<WebsocketClient<any, any>> {

    const client = new WebsocketStubClient();
    setTimeout(() => {
      client.internalStub.next({
        message: 'Stub ExecLog',
        isInfo: true
      });
      client.internalStub.next({
        message: 'Stub2 ExecLog',
        isInfo: true
      });
      client.internalStub.next({
        message: 'Stub3 ExecLog',
        isError: true
      });
      client.internalStub.complete();
    }, 1000);
    return Promise.resolve(client);
  }

}
