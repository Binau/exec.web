import {Component, OnInit} from '@angular/core';
import {ExecParam} from '../../component/exec/param/exec.param';

@Component({
  selector: 'app-demo-exec',
  templateUrl: './demo-exec.component.html',
  styleUrls: ['./demo-exec.component.css']
})
export class DemoExecComponent implements OnInit {

  public text1 = '' +
    '# Composant d\'execution\n' +
    'Le composant d\'éxecution permet de proposer du code et de l\'executer.\n' +
    'Exemple ci dessous avec un composant d\'execution java :\n' +
    '';
  private _displayTitle = true;

  public set allowFilesChange(val: boolean) {
    this.paramDemo1.filesNameReadOnly = !val;
  }

  public get allowFilesChange(): boolean {
    return !this.paramDemo1.filesNameReadOnly;
  }

  public set allowExec(val: boolean) {
    this.paramDemo1.disableExecution = !val;
  }

  public get allowExec(): boolean {
    return !this.paramDemo1.disableExecution;
  }

  public set displayFiles(val: boolean) {
    this.paramDemo1.hideFilesName = !val;
  }

  public get displayFiles(): boolean {
    return !this.paramDemo1.hideFilesName;
  }

  public set displayTitle(val: boolean) {
    this._displayTitle = val;
    this.paramDemo1.title = val ? 'Démo composant Java' : '';
  }

  public get displayTitle(): boolean {
    return this._displayTitle;
  }

  public paramDemo1: ExecParam = {
    title: 'Démo composant Java',
    idImage: 'simple-java'
  };
  public paramDisplayJson: ExecParam = {
    files : [
      {
        name : 'test.json',
        content: '{\n "plop":"val" \n}'
      }
    ],
    disableExecution: true,
    filesNameReadOnly: true
  };

  constructor() {
  }

  public async ngOnInit() {
  }

}
