import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs';

export class WebsocketClient<T, U> {
  public observable?: Observable<U>;
  public observer?: Observer<T>;

}

@Injectable()
export class WebsocketService {

  constructor() {
  }

  public async connect<T, U>(url: string): Promise<WebsocketClient<T, U>> {

    const currentHost = window.location.host;
    const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';

    const ws = new WebSocket(`${wsProtocol}//${currentHost}${url}`);
    const client: WebsocketClient<T, U> = new WebsocketClient<T, U>();

    client.observer = {
      next: (data: T) => {

        let message: any;
        if ((typeof data) === 'string') message = data;
        else message = JSON.stringify(data);

        if (ws.readyState === WebSocket.OPEN) ws.send(message);
        else throw new Error('Websocket déconnecté, impossible d\'envoyer des données');
      },
      error: (err: any) => {
        console.error('ERROR : ', err);
      },
      complete: () => ws.close()
    };

    return new Promise<WebsocketClient<T, U>>((res, rej) => {

      ws.onopen = () => {
        client.observable = Observable.create(
          (obs: Observer<U>) => {
            ws.onmessage = (e: MessageEvent) => obs.next(JSON.parse(e.data));
            ws.onerror = obs.error.bind(obs);
            ws.onclose = obs.complete.bind(obs);
            return ws.close.bind(ws);
          });
        res(client);
      };
      ws.onerror = (e) => {
        console.error(e);
        rej(e);
      };
    });

  }

}
