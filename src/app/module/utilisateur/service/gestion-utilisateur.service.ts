import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {IUser} from "../model/utilisateur";

@Injectable({
  providedIn: 'root'
})
export class GestionUtilisateurService {

  TOKEN_KEY = 'token';

  constructor( private http: HttpClient) {}

  get token() {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  creationUtilisateur(utilisateur: IUser) {
      this.http.post( '/rest/utilisateur/enregistrer', utilisateur).subscribe(res => {
    })
  }

  login(utilisateur: IUser) {
    this.http.post<any>( '/rest/utilisateur/login', utilisateur).subscribe(res => {
      localStorage.setItem(this.TOKEN_KEY, res.token);
    })
  }

}

