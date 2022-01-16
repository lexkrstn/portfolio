import { isPlainObject } from 'lodash';

export function omitUnderscoredProps<
  T extends Record<string, any> | Record<string, any>[],
>(objOrArr: T): Partial<T> {
  if (Array.isArray(objOrArr)) {
    return objOrArr.map(omitUnderscoredProps) as T;
  }
  if (!isPlainObject(objOrArr)) {
    return objOrArr as T;
  }
  const result = {} as Partial<T>;
  const keys = Object.keys(objOrArr).filter(k => !k.startsWith('_')) as (keyof T)[];
  for (const key of keys) {
    result[key] = isPlainObject(objOrArr[key]) || Array.isArray(objOrArr[key])
      ? omitUnderscoredProps(objOrArr[key]) as any
      : objOrArr[key];
  }
  return result;
}
