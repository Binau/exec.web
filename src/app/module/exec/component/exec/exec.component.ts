import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {ExecService} from '../../service/exec.service';
import {ExecComponentBean} from './bean/exec.component.bean';
import {ExecInfos, ExecLog, ExecParam as SrvExecParam} from '../../api/exec.api';
import {CodeMirrorLanguage} from '../../../common/component/code-mirror/code-mirror.param';
import {ExecParam} from './param/exec.param';
import {ExecComponentFileBean} from './bean/exec.component.file.bean';
import {ExecFileParam} from './param/exec.file.param';


@Component({
  selector: 'app-exec',
  templateUrl: './exec.component.html',
  styleUrls: ['./exec.component.css']
})
export class ExecComponent implements OnInit {

  /**
   * Parametres entrants
   */
  @Input()
  public params: ExecParam;

  /**
   * Informations pour le composant d'execution
   */
  public execBean: ExecComponentBean = new ExecComponentBean();

  public logs: ExecLog[];

  private componentFileIdIt = this.componentFileIdIterator();
  private onClickWindowsListener = this.onClickWindows.bind(this);

  constructor(
    private elementRef: ElementRef,
    private execService: ExecService) {
  }

  public async ngOnInit() {
    this.params = this.params || {};
    console.log('Affichage du composant ExecComponent', this.params);

    // Recuperation des infos d'execution lié au parametre idImage via api http
    let execInfos: ExecInfos;
    if (this.params.idImage) {
      execInfos = await this.execService.getExecInfos(this.params.idImage);
    }
    // Init du composant
    this.initComponentBean(execInfos);

    // Init des fichiers affichés à partir du context
    this.resetFilesFromOriginalFile();

    // On surveille les clics sur le tabs wrapper
    const tabsWrapper: HTMLElement = this.findHtmlChild('tabs-wrapper');
    tabsWrapper.addEventListener('click', (e) => (e as any).tabsWrapperFlag = true);
  }

  /**
   * Evenements
   */
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

  public onSubmitFileName(file: ExecComponentFileBean): void {
    this.resetCodeMirrorLanguage.bind(this, file);
    this.execBean.inFilesEdition = false;
  }

  public onClickReset(): void {
    this.resetFilesFromOriginalFile();
  }

  /**
   * *********************************
   */

  private resetFilesFromOriginalFile() {
    this.execBean.currentFiles.splice(0);
    this.execBean.currentFiles.push(...this.execBean.originalFiles.map(f => this.cloneExecComponentFileBean(f)));
    this.selectFile(this.execBean.currentFiles[0]);
  }

  private mapComponentBeanToExecParam(): SrvExecParam {
    const execParam = new SrvExecParam();
    execParam.idImage = this.params.idImage;
    execParam.files = this.execBean.currentFiles.map(f => {
      return {
        filePath: f.name,
        code: f.content
      };
    });

    return execParam;
  }

  private createNewFile(): ExecComponentFileBean {
    const newFile: ExecComponentFileBean = this.createNewFileBean({
      name: '',
      content: ''
    });

    const fileIndexTag = '#FILE_INDEX#';
    const fileNameTag = '#FILE_NAME#';

    newFile.name = this.execBean.execInfos.newFileTemplate.filePath.replace(fileIndexTag, '' + newFile.id);
    newFile.content = this.execBean.execInfos.newFileTemplate.code
      .replace(
        new RegExp(fileIndexTag, 'g'), '' + newFile.id)
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
    switch (file.fileNameExtention) {
      case '.json':
        file.codeMirrorOpts.language = CodeMirrorLanguage.JSON;
        break;
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

  private* componentFileIdIterator(): IterableIterator<number> {
    let id = 0;
    while (true) yield ++id;
  }

  private initComponentBean(execInfos: ExecInfos) {

    this.execBean.params = this.params;
    this.execBean.execInfos = execInfos;

    // Si pas d'infos d'execution, on desactive l'execution
    if (!this.execBean.execInfos) {
      this.execBean.params.disableExecution = true;
    }

    this.initOriginalFiles();

  }

  /**
   * Initialisation des fichiers de reference
   */
  private initOriginalFiles() {

    // Si présent, initialisation avec les fichiers en parametres
    if (this.execBean.params.files && this.execBean.params.files.length > 0) {

      for (const file of this.execBean.params.files) {
        this.pushNewOriginalFile(file
        );
      }

      return;
    }

    // Sinon initialisation avec le template d'execution
    if (this.execBean.execInfos && this.execBean.execInfos.bootFileTemplate) {

      this.pushNewOriginalFile({
        name: this.execBean.execInfos.bootFileTemplate.filePath,
        content: this.execBean.execInfos.bootFileTemplate.code
      });

      return;
    }

    // Sinon initialisation d'un fichier txt vide

    this.pushNewOriginalFile({
      name: 'README.txt',
      content: 'Aucun fichier proposé'
    });
  }

  /**
   * Creation d'un nouveau fileBean
   * @param param
   */
  private createNewFileBean(param: ExecFileParam): ExecComponentFileBean {
    const file: ExecComponentFileBean = new ExecComponentFileBean();
    file.id = this.componentFileIdIt.next().value;
    file.param = param;

    // Mise à jour opts code mirror
    file.codeMirrorOpts.readOnly = file.param.fileContentReadOnly;
    this.resetCodeMirrorLanguage.bind(this, file);

    return file;
  }

  /**
   * Initialise un nouveau fichier de reference
   * @param fileName
   * @param fileContent
   */
  private pushNewOriginalFile(param: ExecFileParam) {
    this.execBean.originalFiles.push(this.createNewFileBean(param));
  }

  private cloneExecComponentFileBean(bean: ExecComponentFileBean): ExecComponentFileBean {

    const newBean = new ExecComponentFileBean();
    newBean.id = bean.id;
    newBean.codeMirrorOpts = bean.codeMirrorOpts;
    newBean.param = {
      name: bean.param.name,
      content: bean.param.content,
      fileContentReadOnly: bean.param.fileContentReadOnly,
      fileTitleReadOnly: bean.param.fileTitleReadOnly
    };

    // Mise à jour opts code mirror
    newBean.codeMirrorOpts.readOnly = newBean.param.fileContentReadOnly;

    return newBean;
  }

}
