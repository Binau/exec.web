import {ExecInfos} from '../../../api/exec.api';
import {ExecInstance} from '../../../service/exec.service';
import {ExecParam} from '../param/exec.param';
import {ExecComponentFileBean} from './exec.component.file.bean';

/**
 * Informations sur le composant d'execution
 */
export class ExecComponentBean {

  /**
   * Parametrage
   */
  public params: ExecParam = {};

  public get title(): string {
    return this.params.title ? this.params.title : '';
  }

  public get displayEditFiles(): boolean {
    return !this.params.filesNameReadOnly && !this.inFilesEdition;
  }

  public get displayExecution(): boolean {
    return !this.params.disableExecution;
  }

  public get displayHeader(): boolean {
    return this.title !== '';
  }

  public get displayFilesName(): boolean {
    return !this.params.hideFilesName;
  }

  /**
   * Information d'execution
   */
  public execInfos: ExecInfos;

  public get description(): string {
    if (this.execInfos) return this.execInfos.description;
    return 'Pas de description';
  }

  public originalFiles: ExecComponentFileBean[] = [];
  public currentFiles: ExecComponentFileBean[] = [];

  public selectedFile: ExecComponentFileBean;
  public inFilesEdition = false;
  public inExecution = false;

  public currentExec: ExecInstance;

}


