import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpStubInterceptor} from '../stub/httpStub.interceptor';
import {WebsocketStubService} from '../stub/service/websocket.stub.service';
import {WebsocketService} from '../app/module/common/service/websocket.service';


export const environment = {
  production: false,
  envProviders: [
    // Bouchonnage des appels http
    {provide: HTTP_INTERCEPTORS, useClass: HttpStubInterceptor, multi: true},
  ],
  // Bouchonnage de websockets
  wsService: {provide: WebsocketService, useClass: WebsocketStubService},
};
