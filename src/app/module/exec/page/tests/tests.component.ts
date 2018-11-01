import {Component, OnInit} from '@angular/core';
import {TestsService} from '../../service/tests.service';
import {TabPanelBean} from '../../../common/component/tab-panel/tab-panel.bean';
import {TabPanelClickEvent} from '../../../common/component/tab-panel/tab-panel-click.event';
import {ArrayUtil} from '../../../../tool/array.util';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent {

  public headers: TabPanelBean[] = ArrayUtil.createObjArray<TabPanelBean>(12, i => {
    return {
      label: `Titre - ${i}`
    };
  });

  public content1Actif: string;
  public content2Click: string;

  constructor(
    private testsService: TestsService
  ) {
  }

  public cancelTabClick(event: TabPanelClickEvent) {
    event.cancel = true;
    this.content2Click = `${event.tab.label}`;
  }

  public tab1ActifChange($event: TabPanelBean) {
    this.content1Actif = $event.label;
  }
}
