import {ArrayUtil} from '../../app/tool/array.util';

export class DataTestUtil {
  public static createList<T>(nb: number, map: (i: number) => T): T[] {
    return ArrayUtil.createIndexArray(nb).map<T>(i => map(i));
  }
}
