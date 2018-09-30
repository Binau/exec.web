export class ArrayUtil {
  public static createIndexArray(length: number): Array<number> {
    return Array.apply(null, {length: length}).map((v, i) => i);
  }
}
