import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TabPanelBean} from './tab-panel.bean';
import {TabPanelClickEvent} from './tab-panel-click.event';

@Component({
  selector: 'app-tab-panel',
  templateUrl: './tab-panel.component.html',
  styleUrls: ['./tab-panel.component.css']
})
export class TabPanelComponent implements OnInit {

  @Input() headers: TabPanelBean[];
  @Input() resizable: boolean;

  @Output() headerTabClick: EventEmitter<TabPanelClickEvent> = new EventEmitter();
  @Output() headerActifChange: EventEmitter<TabPanelBean> = new EventEmitter();
  @Output() headerLabelChange: EventEmitter<TabPanelBean> = new EventEmitter();

  constructor() {
  }

  public ngOnInit() {
    this.initActive();
  }

  /**
   *
   */
  private initActive() {

    // Si pas d'entetes, on ne fait rien
    if (this.headers.length === 0) return;

    // Permet d'activer une seule tab ou tab par defaut
    let tabActive = this.headers.find(t => t.active);
    if (!tabActive) tabActive = this.headers[0];

    this.setActif(tabActive);
  }

  /**
   * Action au clic sur un onglet
   */
  public onTabClick(tab: TabPanelBean) {

    if (tab.active) return;

    const event = new TabPanelClickEvent();
    event.tab = tab;
    this.headerTabClick.emit(event);

    if (!event.cancel) this.setActif(tab);
  }

  /**
   * Permet de selectionner l'onglet actif
   * @param tab
   */
  public setActif(tab: TabPanelBean) {

    this.headers.forEach(t => t.active = t === tab);
    this.headerActifChange.emit(tab);
  }

}
