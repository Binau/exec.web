import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { IFormation } from '../../model/formation';
import { ICycleFormation } from '../../model/cycle-formation';
import { GestionFormationService } from "../../service/gestion-formation.service"

@Component({
  selector: 'app-contenu-cycle-formation',
  templateUrl: './contenu-cycle-formation.component.html',
  styleUrls: ['./contenu-cycle-formation.component.css']
})
export class ContenuCycleFormationComponent implements OnInit {


  formationsDebutants : IFormation[];
  formationsDebutantsFiltree :  IFormation[];

  formationsIntermediaires : IFormation[];
  formationsIntermediairesFiltree :  IFormation[];

  formationsAvancees : IFormation[];
  formationsAvanceesFiltree :  IFormation[];
  cycleDeFormation : ICycleFormation;

  constructor(private gestionFormationService: GestionFormationService, private route:ActivatedRoute) { }

  public async ngOnInit() {

    let idCycleFormation = this.route.snapshot.paramMap.get('idCycleFormation');

    // récupérer le cycle de formation sur lequel on est
    this.cycleDeFormation = await this.gestionFormationService.recupererLeCycleDeFormationParSonId(idCycleFormation);

    // récupérer les formations
    let formations = await this.gestionFormationService.recupererLesFormationsDUnCycleDeFormations(idCycleFormation);

    this.formationsDebutantsFiltree = formations.filter(formation => formation.niveauFormation ==='debutant');
    this.formationsIntermediairesFiltree = formations.filter(formation => formation.niveauFormation ==='intermediaire');
    this.formationsAvanceesFiltree = formations.filter(formation => formation.niveauFormation ==='avancee');
    // débutant
    // intermediaire
    // confirmé


    /*


    this.formationsDebutants =
    [
      {
        id: '1',
        nom: 'formation debutant 1',
        description: 'description 1',
        progression : 40,
        image:'assets/debutant_4.jpg'},
        
      {id: '2',
        nom: 'formation debutant 2',
        description: 'description 2',
        progression : 0,
        image:'assets/debutant_2.jpg'},

      {id: '3',
        nom: 'formation debutant 3',
        description: 'description 3',
        progression : 100,
        image:'assets/debutant_3.jpg'},

        {id: '4',
        nom: 'formation debutant 4',
        description: 'description 4',
        progression : 0,
        image:'assets/debutant_1.jpg'}
    ];
    this.formationsDebutantsFiltree = this.formationsDebutants;
  

    this.formationsIntermediaires =
    [
      {
        id: '1',
        nom: 'formation intermédiaire 1',
        description: 'description formation intermédiaire 1',
        progression : 30,
        image:'assets/intermediaire_1.jpg'},
      {
        id: '2',
        nom: 'formation intermédiaire 2',
        description: 'description formation intermédiaire 2',
        progression : 0,
        image:'assets/intermediaire_3.jpg'},
      {
        id: '3',
        nom: 'formation intermédiaire 3',
         description: 'description formation intermédiaire 3',
         progression : 0,
         image:'assets/intermediaire_2.jpg'},
    ];

    this.formationsIntermediairesFiltree = this.formationsIntermediaires;

    this.formationsAvancees = 
    [
      {
        id: '1',
        nom: 'formation avancee 1',
        description: 'description formation avancee 1',
        progression : 100,
        image:'assets/avancee_1.jpg'},
      {id: '2',
        nom: 'formation avancee 2',
        description: 'description formation avancee 2',
        progression : 50,
        image:'assets/avancee_2.jpg'}
    ];
    this.formationsAvanceesFiltree = this.formationsAvancees;*/

  }

}
