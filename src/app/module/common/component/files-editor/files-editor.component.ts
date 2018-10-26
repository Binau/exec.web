import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {ExecParam} from '../../../exec/component/exec/param/exec.param';
import {ExecComponentBean} from '../../../exec/component/exec/bean/exec.component.bean';
import {ExecInfos, ExecLog, ExecParam as SrvExecParam} from '../../../exec/api/exec.api';
import {ExecService} from '../../../exec/service/exec.service';
import {ExecComponentFileBean} from '../../../exec/component/exec/bean/exec.component.file.bean';
import {CodeMirrorLanguage} from '../code-mirror/code-mirror.param';
import {ExecFileParam} from '../../../exec/component/exec/param/exec.file.param';

@Component({
  selector: 'app-files-editor',
  templateUrl: './files-editor.component.html',
  styleUrls: ['./files-editor.component.css']
})
export class FilesEditorComponent implements OnInit {

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
   * Methodes utilitaires
   */
  public isFileNameInEdition(file: ExecComponentFileBean): boolean {
    return this.execBean.inFilesEdition && !file.param.fileNameReadOnly;
  }


  /**
   * EVENEMENTS
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
    const file = this.addNewFile();

    // Selection du input ajouté pour simplifier le nommage
    setTimeout(() => {
      const input: HTMLInputElement = this.findHtmlChild(file.inputTagName);
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
    this.resetCodeMirrorLanguage(file);
    this.execBean.inFilesEdition = false;
  }

  public onClickReset(): void {
    this.resetFilesFromOriginalFile();
  }

  /**
   * *********************************
   */

  private addNewFile(): ExecComponentFileBean {

    const newFile: ExecComponentFileBean = this.createNewFileBean({
      name: '',
      content: ''
    });

    const fileIndexTag = '#FILE_INDEX#';
    const fileNameTag = '#FILE_NAME#';
    let fileNameTemplate = 'new#FILE_INDEX#';
    let fileContentTemplate = '';

    // Creation d'un fichier a partir d'un template fourni TODO

    // Creation d'un fichier a partir d'un template de l'execInfo
    if (this.execBean.execInfos && this.execBean.execInfos.newFileTemplate) {
      fileNameTemplate = this.execBean.execInfos.newFileTemplate.filePath;
      fileContentTemplate = this.execBean.execInfos.newFileTemplate.code;
    }

    newFile.name = fileNameTemplate.replace(fileIndexTag, '' + newFile.id);
    newFile.content = fileContentTemplate
      .replace(
        new RegExp(fileIndexTag, 'g'), '' + newFile.id)
      .replace(
        new RegExp(fileNameTag, 'g'), newFile.name);


    this.execBean.currentFiles.push(newFile);
    this.selectFile(newFile);

    return newFile;
  }

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
      case '.ts':
        file.codeMirrorOpts.language = CodeMirrorLanguage.TYPESCRIPT;
        break;
      case '.java':
        file.codeMirrorOpts.language = CodeMirrorLanguage.JAVA;
        break;
      case '.html':
        file.codeMirrorOpts.language = CodeMirrorLanguage.HTML;
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
    this.resetCodeMirrorLanguage(file);

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
      fileNameReadOnly: bean.param.fileNameReadOnly
    };

    // Mise à jour opts code mirror
    this.resetCodeMirrorLanguage(newBean);
    newBean.codeMirrorOpts.readOnly = newBean.param.fileContentReadOnly;

    return newBean;
  }

}
