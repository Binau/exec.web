import { Component, OnInit } from '@angular/core';
import { GestionUtilisateurService } from "../../service/gestion-utilisateur.service"
import {IUser} from "../../model/utilisateur";

@Component({
  selector: 'app-creation-utilisateur',
  templateUrl: './creation-utilisateur.component.html',
  styleUrls: ['./creation-utilisateur.component.css']
})
export class CreationUtilisateurComponent implements OnInit {

  constructor(private gestionUtilisateurService: GestionUtilisateurService) { }
  utilisateur : IUser ={};

  ngOnInit() {
  }

  creationUtilisateur() {
    this.gestionUtilisateurService.creationUtilisateur(this.utilisateur);
  }

}
