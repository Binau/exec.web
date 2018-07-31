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
          image: 'https://www.shareicon.net/data/128x128/2016/07/06/106573_software_512x512.png',
          description: 'JavaScript is the most widely deployed language in the world. '
        },
        {
          id: '2',
          nom: 'Angular',
          image: 'https://www.shareicon.net/data/128x128/2016/07/08/116973_development_512x512.png',
          description: 'Angular is a complete JavaScript framework for creating dynamic and interactive applications in HTML.'
        },
        {
          id: '3',
          nom: 'CSS',
          image: 'https://www.shareicon.net/data/128x128/2015/10/17/657572_css_512x512.png',
          description: 'Web browsers are extremely capable graphics platforms with the ability to manipulate fonts, colors, shapes and even animations. The file format that controls these is cascading style sheets (CSS).'
        },
        {
          id: '4',
          nom: 'NodeJS',
          image: 'https://www.shareicon.net/data/128x128/2015/10/06/112725_development_512x512.png',
          description: 'Node.js is a JavaScript runtime that uses a non-blocking I/O model that makes it lightweight, efficient and very popular among JavaScript developers who also need to write server-side code'
        },
        {
          id: '5',
          nom: 'Docker',
          image: 'https://www.shareicon.net/data/128x128/2017/05/24/886232_media_512x512.png',
          description: 'Containers represent a higher-density kind of "virtualization" that can meet the needs of certain scenarios better than traditional hypervisors.'
        }
        
      ];
    this.cycleDeFormationsFiltree = this.cycleDeFormations;

  }

}
