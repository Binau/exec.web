export class ArrayUtil {
  public static createIndexArray(length: number): Array<number> {
    return Array.apply(null, {length: length}).map((v, i) => i);
  }

  public static createObjArray<T>(length: number, mapCb: (i: number) => T): Array<T> {
    return Array.apply(null, {length: length}).map((v, i) => mapCb(i));
  }
}

