import { Component, OnInit } from '@angular/core';
import { ICycleFormation } from '../../model/cycle-formation';
import { GestionFormationService } from "../../service/gestion-formation.service"

@Component({
  selector: 'app-recherche-cycle-formation',
  templateUrl: './recherche-cycle-formation.component.html',
  styleUrls: ['./recherche-cycle-formation.component.css']
})
export class RechercheCycleFormationComponent implements OnInit {

  titrePage: string = `Choix d'un cycle de formation`;

  cycleDeFormations : ICycleFormation[];
  cycleDeFormationsFiltree : ICycleFormation[];

  constructor(private gestionFormationService: GestionFormationService) { }

  public async ngOnInit() {
    console.log('ngOnInit');
    this.cycleDeFormations = await this.gestionFormationService.recupererLesCyclesDeFormations();

    this.cycleDeFormationsFiltree = this.cycleDeFormations;

  }

}
