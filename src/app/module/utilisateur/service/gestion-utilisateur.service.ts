import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {IUser} from "../model/utilisateur";

@Injectable({
  providedIn: 'root'
})
export class GestionUtilisateurService {

  constructor( private http: HttpClient) {}

  creationUtilisateur(utilisateur: IUser) {
      this.http.post( '/rest/utilisateur/enregistrer', utilisateur).subscribe(res => {
    })
  }

  login(utilisateur: IUser) {
    this.http.post( '/rest/utilisateur/login', utilisateur).subscribe(res => {
      localStorage.setItem('token',res['token']);
  })
}

}

