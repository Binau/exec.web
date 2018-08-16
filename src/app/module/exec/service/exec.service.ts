import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WebsocketClient, WebsocketService} from '../../common/service/websocket.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ExecInfos, ExecLog, ExecParam} from '../api/exec.api';

export class ExecInstance {
  public logs: Observable<ExecLog>;
  public stopCb: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class ExecService {

  private static EXEC_URL = 'rest/execs';

  constructor(
    private wsService: WebsocketService,
    private http: HttpClient) {
  }

  public async getExecInfos(imageId: string): Promise<ExecInfos> {
    return this.http.get<ExecInfos>(`${ExecService.EXEC_URL}/${imageId}`).toPromise();
  }

  public async exec(param: ExecParam): Promise<ExecInstance> {
    let client: WebsocketClient;

    // Connexion au ws
    try {
      client = await this.wsService.connect(`/ws/exec`);

    } catch (e) {
      console.log(e);
    }

    // Envoi la requete d'execution
    client.observer.next(JSON.stringify(param));

    // Mapping de chaque resultats
    return {
      logs: client.observable.pipe(map<string, ExecLog>(m => JSON.parse(m))),
      stopCb: () => {
        client.observer.complete();
      }
    };

  }

}
