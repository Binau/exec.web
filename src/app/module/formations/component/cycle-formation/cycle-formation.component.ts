import { Component, OnInit, Input } from '@angular/core';
import { ICycleFormation } from '../../model/cycle-formation';

@Component({
  selector: 'app-cycle-formation',
  templateUrl: './cycle-formation.component.html',
  styleUrls: ['./cycle-formation.component.css']
})
export class CycleFormationComponent implements OnInit {

  @Input() cycleFormation : ICycleFormation;

  constructor() { }

  ngOnInit() {
  }

}
