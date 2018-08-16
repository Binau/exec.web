import { TestBed, inject } from '@angular/core/testing';

import { GestionFormationService } from './gestion-formation.service';

describe('GestionFormationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GestionFormationService]
    });
  });

  it('should be created', inject([GestionFormationService], (service: GestionFormationService) => {
    expect(service).toBeTruthy();
  }));
});
