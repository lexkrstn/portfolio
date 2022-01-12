import { isObject } from 'lodash';

export function omitUnderscoredProps<
  T extends Record<string, any> | Record<string, any>[],
>(objOrArr: T): Partial<T> {
  if (Array.isArray(objOrArr)) {
    return objOrArr.map(omitUnderscoredProps) as T;
  }
  const result = {} as Partial<T>;
  const keys = Object.keys(objOrArr).filter(k => !k.startsWith('_')) as (keyof T)[];
  for (const key of keys) {
    result[key] = isObject(objOrArr[key])
      ? omitUnderscoredProps(objOrArr[key]) as any
      : objOrArr[key];
  }
  return result;
}
