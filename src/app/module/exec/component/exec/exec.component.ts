import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ExecService} from '../../service/exec.service';
import {CodeMirrorApi} from '../../../common/component/code-mirror/code-mirror.api';
import {ExecComponentBean, ExecComponentFileBean} from './exec.component.bean';
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
  private onClickWindowsListener = this.onClickWindows.bind(this);

  constructor(
    private elementRef: ElementRef,
    private execService: ExecService) {
  }

  public async ngOnInit() {
    console.log('Affichage du composant ExecComponent', this.idImage);

    // Recuperation des infos via api http
    const execInfos: ExecInfos = await this.execService.getExecInfos(this.idImage);
    this.codeMirrorOpts.langage = execInfos.langage;

    //
    this.mapExecInfosToComponentBean(execInfos);
    this.resetFilesFromOriginalFile();
    this.selectFile(this.execBean.originalFiles[0]);

    // On surveille les clics sur le tabs wrapper
    const tabsWrapper: HTMLElement = this.findHtmlChild('tabs-wrapper');
    tabsWrapper.addEventListener('click', (e) => (e as any).tabsWrapperFlag = true);
  }

  public onClickEdit(): void {
    this.execBean.inFilesEdition = true;
    window.addEventListener('click', this.onClickWindowsListener);
  }

  private onClickWindows(e): void {
    if (!(e as any).tabsWrapperFlag) {
      this.execBean.inFilesEdition = false;
      window.removeEventListener('click', this.onClickWindowsListener);
    }
  }

  public onClickAdd(): void {
    const newFile: ExecComponentFileBean = this.createNewFile();
    this.execBean.currentFiles.push(newFile);
    this.selectFile(newFile);

    // Selection du input ajouté pour simplifier le nommage
    setTimeout(() => {
      const input: HTMLInputElement = this.findHtmlChild(newFile.inputTagName);
      input.select();
    });
  }

  public onClickFile(file: ExecComponentFileBean): void {
    this.selectFile(file);
  }

  public onClickDelete(file: ExecComponentFileBean): void {
    this.deleteFile(file);
  }

  public async onClickExec() {

    this.logs = [];
    this.execBean.inExecution = true;

    this.execBean.currentExec = await this.execService.exec(this.mapComponentBeanToExecParam());
    this.execBean.currentExec.logs.subscribe(
      (l) => {

        if ((l as any).wsError) this.displayError(l.message);
        else this.logs.push(l);
      },
      (e: Error) => {
        this.displayError(e.message);
      }, () => {
        // Fin de l'execution
        this.execBean.inExecution = false;
      });

  }

  public async onClickStop() {
    this.execBean.currentExec.stopCb();
  }

  public onSubmitFile(): void {
    this.execBean.inFilesEdition = false;
  }

  private mapExecInfosToComponentBean(execInfos: ExecInfos) {

    // Ajout du fichier par defaut
    const file: ExecComponentFileBean = new ExecComponentFileBean();

    file.id = this.componentFileIdIt.next().value;
    file.name = execInfos.bootFileTemplate.filePath;
    file.content = execInfos.bootFileTemplate.code;
    this.execBean.originalFiles.push(file);

    //
    this.execBean.execInfos = execInfos;
    this.execBean.description = execInfos.description;
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


  private* componentFileIdIterator(): IterableIterator<number> {
    let id = 0;
    while (true) yield ++id;
  }

  private createNewFile(): ExecComponentFileBean {
    const nextId = this.componentFileIdIt.next().value;
    const newFile: ExecComponentFileBean = new ExecComponentFileBean();
    newFile.id = nextId;

    const fileIndexTag = '#FILE_INDEX#';
    const fileNameTag = '#FILE_NAME#';

    newFile.name = this.execBean.execInfos.newFileTemplate.filePath.replace(fileIndexTag, '' + nextId);
    newFile.content = this.execBean.execInfos.newFileTemplate.code
      .replace(
        new RegExp(fileIndexTag, 'g'), '' + nextId)
      .replace(
        new RegExp(fileNameTag, 'g'), newFile.name);

    return newFile;
  }

  private selectFile(file: ExecComponentFileBean) {
    this.execBean.selectedFile = file;
  }

  private deleteFile(file: ExecComponentFileBean) {

    const index = this.execBean.currentFiles.findIndex(f => f.id === file.id);
    this.execBean.currentFiles.splice(index, 1);

    if (this.execBean.selectedFile === file) {
      const newIndex = Math.min(index, this.execBean.currentFiles.length - 1);
      this.execBean.selectedFile = this.execBean.currentFiles[newIndex];
    }
  }

  private findHtmlChild<T>(cssClass: string): T {
    return this.elementRef.nativeElement.getElementsByClassName(cssClass)[0] as T;
  }

  private displayError(message: string) {
    console.log(message);
    this.logs.push({
      isError: true,
      message: `Erreur : ${message}`
    });
  }

}
