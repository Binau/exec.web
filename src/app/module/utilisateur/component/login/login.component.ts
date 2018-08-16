import { Component, OnInit } from '@angular/core';
import { GestionUtilisateurService } from "../../service/gestion-utilisateur.service"
import {IUser} from "../../model/utilisateur";
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  utilisateur  : IUser ={};

  constructor(private gestionUtilisateurService: GestionUtilisateurService, private router :Router) { }

  ngOnInit() {
  }

  
  login() {
    this.gestionUtilisateurService.login(this.utilisateur);
    this.router.navigate(['/accueil']);
  }

}
