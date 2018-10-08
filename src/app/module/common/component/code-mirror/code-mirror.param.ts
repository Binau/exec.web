import {EventEmitter} from '@angular/core';

export enum CodeMirrorLanguage {
  NONE = '',
  JAVASCRIPT = 'javascript',
  JSON = 'application/json',
  JAVA = 'text/x-java',
  SHELL = 'shell'
}

export class CodeMirrorParam {
  public languageChanged: EventEmitter<CodeMirrorLanguage> = new EventEmitter<CodeMirrorLanguage>();
  public readOnlyChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _language: CodeMirrorLanguage;
  public set language(value: CodeMirrorLanguage) {
    this._language = value;
    this.languageChanged.emit(this._language);
  }
  public get language(): CodeMirrorLanguage {
    return this._language;
  }

  private _readOnly: boolean;
  public set readOnly(value: boolean) {
    this._readOnly = value;
    this.readOnlyChanged.emit(this._readOnly);
  }
  public get readOnly(): boolean {
    return this._readOnly;
  }




}
