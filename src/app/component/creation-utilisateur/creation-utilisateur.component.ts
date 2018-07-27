import { Component, OnInit } from '@angular/core';
import { GestionUtilisateurService } from "../../service/gestion-utilisateur.service"

@Component({
  selector: 'app-creation-utilisateur',
  templateUrl: './creation-utilisateur.component.html',
  styleUrls: ['./creation-utilisateur.component.css']
})
export class CreationUtilisateurComponent implements OnInit {

  constructor(private gestionUtilisateurService: GestionUtilisateurService) { }
  email: string = '';
  login: string = '';
  motDePasse: string = '';

  ngOnInit() {
  }

  creationUtilisateur() {
    this.gestionUtilisateurService.creationUtilisateur(
      {email: "",
        login : "",
        motDePasse:""
      }
    )
  }

}
