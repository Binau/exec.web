import {EventEmitter} from '@angular/core';

export enum CodeMirrorLanguage {
  NONE = '',
  JAVASCRIPT = 'javascript',
  JAVA = 'text/x-java',
  SHELL = 'shell'
}

export class CodeMirrorParam {
  public languageChanged: EventEmitter<string> = new EventEmitter<CodeMirrorLanguage>();

  private _language: CodeMirrorLanguage;
  public set language(value: CodeMirrorLanguage) {
    this._language = value;
    this.languageChanged.emit(this._language);
  }
  public get language(): CodeMirrorLanguage {
    return this._language;
  }


}
