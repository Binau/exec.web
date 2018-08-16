import {Component, ElementRef, EventEmitter, Host, Input, OnInit, Output, ViewChild} from '@angular/core';
import * as CodeMirror from 'codemirror';
// Langages
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/shell/shell';
//
import {CodeMirrorApi} from './code-mirror.api';

@Component({
  selector: 'app-code-mirror',
  templateUrl: './code-mirror.component.html',
  styleUrls: ['./code-mirror.component.css']
})
export class CodeMirrorComponent implements OnInit {

  @Input()
  public value: string;
  @Output()
  public valueChange: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  public options: CodeMirrorApi;


  constructor(
    private host: ElementRef
  ) {
  }


  ngOnInit() {

    if (!this.options) this.options = {};

    // Creation de l'element graphique editor
    const editor = CodeMirror((elt) => {
      this.host.nativeElement.appendChild(elt);
    }, {
      lineNumbers: true,
      value: this.value,
      mode: this.getCodeMirrorMode(this.options),

    });

    // Au defocus, Repercution de la valeur sur le parametre entrant
    editor.on('blur', () => this.valueChange.emit(editor.getValue()));

  }

  private getCodeMirrorMode(options: CodeMirrorApi): string {
    let mode;

    // par defaut;
    if (!options.langage) return 'javascript';

    switch (options.langage) {
      case 'java' :
        mode = 'text/x-java';
        break;
      case 'shell' :
        mode = 'shell';
        break;
      default :
        mode = 'javascript';
    }

    return mode;
  }

}
