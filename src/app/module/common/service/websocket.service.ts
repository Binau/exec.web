import {Injectable} from '@angular/core';
import {Observable, Observer, Subject} from 'rxjs';


export class WebsocketClient {
  public observable?: Observable<string>;
  public observer?: Observer<any>;

}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() {
  }

  public async connect(url: string): Promise<WebsocketClient> {

    const currentHost = window.location.host;
    const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';

    const ws = new WebSocket(`${wsProtocol}//${currentHost}${url}`);
    const client: WebsocketClient = new WebsocketClient();

    client.observer = {
      next: (data: string) => {
        if (ws.readyState === WebSocket.OPEN) ws.send(data);
        else throw new Error('Websocket déconnecté, impossible d\'envoyer des données');

      },
      error: (err: any) => {
        console.error('ERROR : ', err);
      },
      complete: () => ws.close()
    };

    return new Promise<WebsocketClient>((res, rej) => {

      ws.onopen = () => {
        client.observable = Observable.create(
          (obs: Observer<string>) => {
            ws.onmessage = (e: MessageEvent) => obs.next(e.data);
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
