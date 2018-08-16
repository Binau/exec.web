import {Observable} from 'rxjs';
import {ExecLog} from '../../api/exec.api';
import {ExecInstance} from '../../service/exec.service';

export class ExecComponentFileBean {
  public id: number;
  public name: string;
  public content: string;

  // TODO can edit ?
  // TODO can edit content ?

  public get inputTagName(): string {
    return `fileName${this.id}`;
  }
}

export class ExecComponentBean {

  public imageInfos: string;

  public originalFiles: ExecComponentFileBean[] = [];
  public currentFiles: ExecComponentFileBean[] = [];

  public selectedFile: ExecComponentFileBean;
  public inFilesEdition = false;
  public inExecution = false;

  public currentExec: ExecInstance;

}


