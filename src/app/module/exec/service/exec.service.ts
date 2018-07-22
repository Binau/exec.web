import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WebsocketClient, WebsocketService} from '../../common/service/websocket.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ExecLog, ExecParam} from '../api/exec.ws.api';

@Injectable({
  providedIn: 'root'
})
export class ExecService {


  constructor(
    private wsService: WebsocketService,
    private http: HttpClient) {
  }

  public async exec(param: ExecParam): Promise<Observable<ExecLog>> {
    let client: WebsocketClient;

    // Connexion au ws
    try {
      client = await this.wsService.connect(`/ws/exec`);
    } catch (e) {
      console.log(e);
    }

    // Envoi la requete d'execution
    client.send(JSON.stringify(param));

    // Mapping de chaque resultats
    return client.observable.pipe(map<string, ExecLog>(m => JSON.parse(m)));

  }

}
