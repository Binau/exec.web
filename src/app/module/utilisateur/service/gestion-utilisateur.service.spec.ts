import { TestBed, inject } from '@angular/core/testing';

import { GestionUtilisateurService } from './gestion-utilisateur.service';

describe('GestionUtilisateurService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GestionUtilisateurService]
    });
  });

  it('should be created', inject([GestionUtilisateurService], (service: GestionUtilisateurService) => {
    expect(service).toBeTruthy();
  }));
});
