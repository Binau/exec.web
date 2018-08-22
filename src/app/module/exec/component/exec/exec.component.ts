import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {ExecService} from '../../service/exec.service';
import {ExecComponentBean, ExecComponentFileBean} from './exec.component.bean';
import {ExecInfos, ExecLog, ExecParam} from '../../api/exec.api';
import {CodeMirrorLanguage} from '../../../common/component/code-mirror/code-mirror.param';
import {ExecComponentParam} from './exec.component.param';


@Component({
  selector: 'app-exec',
  templateUrl: './exec.component.html',
  styleUrls: ['./exec.component.css']
})
export class ExecComponent implements OnInit {

  @Input() params: ExecComponentParam;

  public execBean: ExecComponentBean = new ExecComponentBean();

  public logs: ExecLog[];

  private componentFileIdIt = this.componentFileIdIterator();
  private onClickWindowsListener = this.onClickWindows.bind(this);

  constructor(
    private elementRef: ElementRef,
    private execService: ExecService) {
  }

  public async ngOnInit() {
    if (!this.params || !this.params.idImage) {
      console.log('ExecComponent : parametre idImage obligatoire', this.params);
      return;
    } else {
      console.log('Affichage du composant ExecComponent', this.params);
    }


    // Recuperation des infos via api http
    const execInfos: ExecInfos = await this.execService.getExecInfos(this.params.idImage);

    //
    this.mapExecInfosToComponentBean(execInfos);
    this.execBean.title = this.params.title ? this.params.title : '';
    this.resetFilesFromOriginalFile();

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

  public onClickReset(): void {
    this.resetFilesFromOriginalFile();
  }

  private mapExecInfosToComponentBean(execInfos: ExecInfos) {

    // Ajout du fichier par defaut
    const file: ExecComponentFileBean = new ExecComponentFileBean();
    file.changeNameEvent.subscribe(
      this.resetCodeMirrorLanguage.bind(this, file)
    );

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
    this.execBean.currentFiles.push(...this.execBean.originalFiles.map(f => {
      const cloned = f.clone();
      cloned.changeNameEvent.subscribe(
        this.resetCodeMirrorLanguage.bind(this, cloned)
      );
      return cloned;
    }));
    this.selectFile(this.execBean.currentFiles[0]);
  }

  private mapComponentBeanToExecParam(): ExecParam {
    const execParam = new ExecParam();
    execParam.idImage = this.params.idImage;
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
    newFile.changeNameEvent.subscribe(
      this.resetCodeMirrorLanguage.bind(this, newFile)
    );
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

  private resetCodeMirrorLanguage(file: ExecComponentFileBean): void {
    console.log('reset for ', file.fileNameExtention);
    switch (file.fileNameExtention) {
      case '.js':
        file.codeMirrorOpts.language = CodeMirrorLanguage.JAVASCRIPT;
        break;
      case '.java':
        file.codeMirrorOpts.language = CodeMirrorLanguage.JAVA;
        break;
      case '.sh':
        file.codeMirrorOpts.language = CodeMirrorLanguage.SHELL;
        break;
      default :
        file.codeMirrorOpts.language = CodeMirrorLanguage.NONE;
    }
  }
}
