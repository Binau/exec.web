import { TestBed, inject } from '@angular/core/testing';

import { AuthInterceptorServiceService } from './auth-interceptor-service.service';

describe('AuthInterceptorServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthInterceptorServiceService]
    });
  });

  it('should be created', inject([AuthInterceptorServiceService], (service: AuthInterceptorServiceService) => {
    expect(service).toBeTruthy();
  }));
});
