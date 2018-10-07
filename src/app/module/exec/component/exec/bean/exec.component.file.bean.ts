import {CodeMirrorParam} from '../../../../common/component/code-mirror/code-mirror.param';
import {ExecFileParam} from '../param/exec.file.param';

/**
 * Informations sur un fichier dans le composant d'execution
 */
export class ExecComponentFileBean {

  public param: ExecFileParam;

  /**
   * Valeur fixe permettant d'identifier les fichiers
   */
  public id: number;

  /**
   * Composant codeMirror
   */
  public codeMirrorOpts: CodeMirrorParam = new CodeMirrorParam();

  // Name
  public get name(): string {
    return this.param.name;
  }

  public set name(name: string) {
    this.param.name = name;
  }

  public get content(): string {
    return this.param.content;
  }

  public set content(content: string) {
    this.param.content = content;
  }

  // Extention
  public get fileNameExtention(): string {
    return this.name.substr(this.name.lastIndexOf('.'));
  }

  // TagName
  public get inputTagName(): string {
    return `fileName${this.id}`;
  }

}

