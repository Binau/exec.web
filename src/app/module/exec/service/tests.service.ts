import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WebsocketClient, WebsocketService} from '../../common/service/websocket.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TestInfos} from '../api/test.http.api';
import {TestInfo, TestParam} from '../api/test.ws.api';

@Injectable({
  providedIn: 'root'
})
export class TestsService {

  private static TESTS_URL = 'rest/tests';
  private static TEST_URL = 'rest/tests/';

  constructor(
    private wsService: WebsocketService,
    private http: HttpClient) {
  }

  public async getTests(): Promise<TestInfos[]> {
    return this.http.get<TestInfos[]>(TestsService.TESTS_URL).toPromise();
  }

  public async getTest(id: string): Promise<TestInfos> {
    return this.http.get<TestInfos>(`${TestsService.TEST_URL}/${id}`).toPromise();
  }

  public async runTest(param: TestParam): Promise<Observable<TestInfo>> {
    let client: WebsocketClient;

    // Connexion au ws
    try {
      client = await this.wsService.connect(`/ws/runTest`);
    } catch (e) {
      console.log(e);
    }

    // Envoi la requete d'execution
    client.observer.next(JSON.stringify(param));

    // Mapping de chaque resultats
    return client.observable.pipe(map<string, TestInfo>(m => JSON.parse(m)));

  }

}
