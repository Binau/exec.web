import { UtilisateurModule } from './utilisateur.module';

describe('UtilisateurModule', () => {
  let utilisateurModule: UtilisateurModule;

  beforeEach(() => {
    utilisateurModule = new UtilisateurModule();
  });

  it('should create an instance', () => {
    expect(utilisateurModule).toBeTruthy();
  });
});
