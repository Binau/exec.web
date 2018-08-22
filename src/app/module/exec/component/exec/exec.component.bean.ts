import {ExecInfos} from '../../api/exec.api';
import {ExecInstance} from '../../service/exec.service';
import {CodeMirrorParam} from '../../../common/component/code-mirror/code-mirror.param';
import {EventEmitter} from '@angular/core';

export class ExecComponentFileBean {
  public id: number;
  public content: string;
  public codeMirrorOpts: CodeMirrorParam = new CodeMirrorParam();

  // Name
  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
    this.changeNameEvent.emit(this._name);
  }

  public changeNameEvent = new EventEmitter<string>();
  private _name: string;

  public get fileNameExtention(): string {
    return this._name.substr(this._name.lastIndexOf('.'));
  }

  //
  // TODO can edit ?
  // TODO can edit content ?

  public get inputTagName(): string {
    return `fileName${this.id}`;
  }

  /**
   * Clone
   */
  public clone(): ExecComponentFileBean {
    const bean: ExecComponentFileBean = new ExecComponentFileBean();
    bean.id = this.id;
    bean.name = this.name;
    bean.content = this.content;
    bean.codeMirrorOpts = this.codeMirrorOpts;
    return bean;
  }

}

export class ExecComponentBean {

  public title = '';

  public get displayHeader(): boolean {
    return this.title !== '';
  }

  public execInfos: ExecInfos = {description: '', bootFileTemplate: null, newFileTemplate: null, langage: null};
  public description: string;

  public originalFiles: ExecComponentFileBean[] = [];
  public currentFiles: ExecComponentFileBean[] = [];

  public selectedFile: ExecComponentFileBean;
  public inFilesEdition = false;
  public inExecution = false;

  public currentExec: ExecInstance;


}

