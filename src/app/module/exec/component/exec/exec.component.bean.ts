export class ExecComponentFileBean {
  public id: number;
  public name: string;
  public content: string;
}

export class ExecComponentBean {

  public originalFiles: ExecComponentFileBean[] = [];
  public currentFiles: ExecComponentFileBean[] = [];

  public selectedFile: ExecComponentFileBean;

}


