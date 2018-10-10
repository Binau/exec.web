/**
 * Parametres pour un fichier du composant d'execution
 */
export interface ExecFileParam {
  name: string;
  content: string;

  fileContentReadOnly?: boolean;
  fileNameReadOnly?: boolean;
}
