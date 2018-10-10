import {ExecInfos} from '../../app/module/exec/api/exec.api';

export const execData: ExecInfos = {
  description: 'Description',
  newFileTemplate: {
    code: 'plop',
    filePath: 'Classe'
  },
  bootFileTemplate: {
    filePath: 'Main.java',
    code: 'public class Main { \n  public static void main (String[] args){ \n    System.out.println("Hello Stub"); \n  } \n}'
  },
  langage: 'java'
};
