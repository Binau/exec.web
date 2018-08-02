import { Component, OnInit, Input } from '@angular/core';
import { IFormation } from '../../model/formation';

@Component({
  selector: 'app-vignette-formation',
  templateUrl: './vignette-formation.component.html',
  styleUrls: ['./vignette-formation.component.css']
})
export class VignetteFormationComponent implements OnInit {

  @Input() formation : IFormation;

  constructor() { }

  ngOnInit() {
  }

}
