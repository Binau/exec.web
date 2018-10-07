/**
 * Parametres pour composant d'execution
 */
import {ExecFileParam} from './exec.file.param';

export interface ExecParam {

  /**
   *  Titre (optionnel)
   */
  title?: string;

  /**
   * Masquer la barre des noms de fichiers
   */
  hideFilesName?: boolean;

  /**
   * Desactiver la possibilité d'editer des noms de fichier, ajouter/supprimer des fichiers
   */
  filesNameReadOnly?: boolean;

  /**
   * Desactiver la possibilité d'editer le contenu des fichiers
   */
  filesContentReadOnly?: boolean;


  /************************
   * FILES
   */
  files?: ExecFileParam[];


  /***************************
   * EXECUTION
   */

  /**
   * Pour informations d"execution
   */
  idImage?: string;

  /**
   * Indique si on desative l'execution
   */
  disableExecution?: boolean;

}
