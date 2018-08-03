import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../../module/common/service/authentification.service';

@Component({
  selector: 'app-barre-navigation',
  templateUrl: './barre-navigation.component.html',
  styleUrls: ['./barre-navigation.component.css']
})
export class BarreNavigationComponent implements OnInit {

  constructor(private authentificationService: AuthentificationService) { }

  ngOnInit() {
  }

  logout() {
    this.authentificationService.logout();
  }

}
