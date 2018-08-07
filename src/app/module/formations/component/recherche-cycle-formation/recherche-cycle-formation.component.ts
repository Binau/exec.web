import { Component, OnInit } from '@angular/core';
import { ICycleFormation } from '../../model/cycle-formation';

@Component({
  selector: 'app-recherche-cycle-formation',
  templateUrl: './recherche-cycle-formation.component.html',
  styleUrls: ['./recherche-cycle-formation.component.css']
})
export class RechercheCycleFormationComponent implements OnInit {

  titrePage: string = `Choix d'un cycle de formation`;

  cycleDeFormations : ICycleFormation[];
  cycleDeFormationsFiltree : ICycleFormation[];

  constructor() { }

  ngOnInit() {
    console.log('ngOnInit');
    this.cycleDeFormations =
      [
        {
          id: '1',
          nom: 'Javascript',
          image: 'assets/js.png',
          description: 'JavaScript is the most widely deployed language in the world. '
        },
        {
          id: '2',
          nom: 'Angular',
          image: 'assets/angular.png',
          description: 'Angular is a complete JavaScript framework for creating dynamic and interactive applications in HTML.'
        },
        {
          id: '3',
          nom: 'CSS',
          image: 'assets/css.png',
          description: 'Web browsers are extremely capable graphics platforms with the ability to manipulate fonts, colors, shapes and even animations. The file format that controls these is cascading style sheets (CSS).'
        },
        {
          id: '4',
          nom: 'NodeJS',
          image: 'assets/nodeJS.png',
          description: 'Node.js is a JavaScript runtime that uses a non-blocking I/O model that makes it lightweight, efficient and very popular among JavaScript developers who also need to write server-side code'
        },
        {
          id: '5',
          nom: 'Docker',
          image: 'assets/docker.png',
          description: 'Containers represent a higher-density kind of "virtualization" that can meet the needs of certain scenarios better than traditional hypervisors.'
        }
        
      ];
    this.cycleDeFormationsFiltree = this.cycleDeFormations;

  }

}
