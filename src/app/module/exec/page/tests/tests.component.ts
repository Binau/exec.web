import {Component, OnInit} from '@angular/core';
import {TestsService} from '../../service/tests.service';
import {TestInfos} from '../../api/test.http.api';
import {ExecParam} from '../../component/exec/param/exec.param';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {

  public tests: TestInfos[];
  public paramJs: ExecParam = {
    title: 'Titre test',
    idImage: 'simple-js'
  };
  public paramJava: ExecParam = {
    title: 'Démo composant Java',
    idImage: 'simple-java'
  };
  public paramBash: ExecParam = {
    idImage: 'simple-bash'
  };

  constructor(private testsService: TestsService) {
  }

  public async ngOnInit() {
    this.tests = await this.testsService.getTests();
  }

}
