import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ExecService} from '../../service/exec.service';
import {CodeMirrorApi} from '../../../common/component/code-mirror.api';
import {ExecComponentBean} from './exec.component.bean';
import {ExecInfos, ExecLog, ExecParam, FileToInject} from '../../api/exec.api';


@Component({
  selector: 'app-exec',
  templateUrl: './exec.component.html',
  styleUrls: ['./exec.component.css']
})
export class ExecComponent implements OnInit {

  // Id de l'image vers laquelle sera testé le code
  @Input() idImage: string;

  public execBean: ExecComponentBean = new ExecComponentBean();
  
  public logs: ExecLog[];
  public codeMirrorOpts: CodeMirrorApi = {};

  private componentFileIdIt = this.componentFileIdIterator();

  constructor(
    private execService: ExecService) {
  }

  public async ngOnInit() {
    console.log('Affichage du composant ExecComponent', this.idImage);

    this.initUi();
  }

  /**
   * Initialisation des données ui
   */
  private async initUi(): Promise<void> {

    // Recuperation des infos via api http
    const execInfos: ExecInfos = await this.execService.getExecInfos(this.idImage);
    this.codeMirrorOpts.langage = execInfos.langage;

    //
    this.mapExecInfosToComponentBean(execInfos);
    this.resetFilesFromOriginalFile();

  }

  private mapExecInfosToComponentBean(execInfos: ExecInfos) {
    this.execBean.originalFiles.push({
      id: this.componentFileIdIt.next().value,
      name: execInfos.bootFileTemplate.filePath,
      content: execInfos.bootFileTemplate.code
    });
    this.execBean.selectedFile = this.execBean.originalFiles[0];
  }

  private resetFilesFromOriginalFile() {
    this.execBean.currentFiles.splice(0);
    this.execBean.currentFiles.push(...this.execBean.originalFiles);
  }

  private mapComponentBeanToExecParam(): ExecParam {
    const execParam = new ExecParam();
    execParam.idImage = this.idImage;
    execParam.files = this.execBean.currentFiles.map(f => {
      return {
        filePath: f.name,
        code: f.content
      };
    });

    return execParam;
  }


  public async onClickExec() {

    this.logs = [];

    const obs: Observable<ExecLog> = await this.execService.exec(this.mapComponentBeanToExecParam());

    obs.subscribe(
      (l) => this.logs.push(l),
      (e: Error) => {
        console.log(e);
        this.logs.push({
          isError: true,
          message: `Erreur : ${e.message}`
        });
      }, () => {
      });

  }

  private* componentFileIdIterator(): IterableIterator<number> {
    let id = 0;
    while (true) yield id++;
  }
}
