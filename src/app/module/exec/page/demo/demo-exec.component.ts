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


  public text2 = '' +
    '# Langages\n' +
    'La coloration syntaxique s\'adapte à l\'extention du fichier.\n' +
    'Exemples :\n' +
    '';
  public paramDisplayJson: ExecParam = {
    files: [
      {
        name: 'test.json',
        content: '{\n' +
          ' "plop":"val"\n' +
          ' "plap":3\n' +
          ' "list":[3, "58", 7887]\n' +
          '}',
        fileContentReadOnly: true,
        fileNameReadOnly: true,
      },
      {
        name: 'test.html',
        content: '<html>\n' +
          '  <body style="display:none;">\n' +
          '    <test></test>\n' +
          '  </body>\n' +
          '</html>',
        fileContentReadOnly: true,
        fileNameReadOnly: true,
      },
      {
        name: 'test.component.ts',
        content: 'export class TestComponent {\n' +
          '  public constructor(){}\n' +
          '    \n' +
          '  \n' +
          '}',
        fileContentReadOnly: true,
        fileNameReadOnly: true,
      },
      {
        name: 'test.java',
        content: 'public class Main { \n' +
          '  public static void main (String[] args){\n' +
          '    System.out.println("Hello Stub");\n' +
          '  }\n' +
          '}',
        fileContentReadOnly: true,
        fileNameReadOnly: true,
      },
      {
        name: 'test.sh',
        content: '#!/bin/bash\n' +
          '\n' +
          'echo \'Hello Bash\'\n',
        fileContentReadOnly: true,
        fileNameReadOnly: true,
      }
    ],
    disableExecution: true,
    filesNameReadOnly: false
  };

  constructor() {
  }

  public async ngOnInit() {
  }

}
