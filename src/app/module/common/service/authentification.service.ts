import { Injectable } from '@angular/core';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private router :Router) { }

  TOKEN_KEY = 'token';

  get estConnecte() {
    return !!localStorage.getItem(this.TOKEN_KEY)
  }


  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/accueil']);
  }

}
