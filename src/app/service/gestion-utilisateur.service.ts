import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {IUser} from "../model/utilisateur";

@Injectable({
  providedIn: 'root'
})
export class GestionUtilisateurService {

  path = "http://localhost:4200/rest";

  constructor( private http: HttpClient) {}

  creationUtilisateur(utilisateur: IUser) {
    this.http.post( '/rest/utilisateur/enregistrer', utilisateur).subscribe(res => {
    })
  }

}

