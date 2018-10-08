import {Component, ElementRef, EventEmitter, Host, Input, OnInit, Output, ViewChild} from '@angular/core';
import * as CodeMirror from 'codemirror';
// Langages
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/shell/shell';
//
import {CodeMirrorParam, CodeMirrorLanguage} from './code-mirror.param';

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
  public options: CodeMirrorParam;


  constructor(
    private host: ElementRef
  ) {
  }


  ngOnInit() {

    if (!this.options) this.options = new CodeMirrorParam();
    if (!this.options.language) this.options.language = CodeMirrorLanguage.NONE;

    // Creation de l'element graphique editor
    const editor = CodeMirror((elt) => {
      this.host.nativeElement.appendChild(elt);
    }, {
      lineNumbers: true,
      value: this.value,
      mode: this.options.language,
      readOnly: this.options.readOnly
    });

    // Changement d'options
    this.options.languageChanged.subscribe((newLanguage) => {
      editor.setOption('mode', newLanguage);
    });

    // Changement de lecture seule
    this.options.readOnlyChanged.subscribe((readOnly) => {
      editor.setOption('readOnly', readOnly);
    });

    // Au defocus, Repercution de la valeur sur le parametre entrant
    editor.on('blur', () => this.valueChange.emit(editor.getValue()));
  }


}
