import { Component, OnInit } from '@angular/core';
import { GestionUtilisateurService } from "../../service/gestion-utilisateur.service"
import {IUser} from "../../model/utilisateur";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  utilisateur  : IUser ={};

  constructor(private gestionUtilisateurService: GestionUtilisateurService) { }

  ngOnInit() {
  }

  
  login() {
    this.gestionUtilisateurService.login(this.utilisateur);
  }

}
