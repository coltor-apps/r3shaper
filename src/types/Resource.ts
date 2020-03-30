import { KeyStringTMap } from './';

export type Resource<T> = (options?: {
  body?: any;
  headers?: object;
  params?: KeyStringTMap<string | number>;
  queryParams?: KeyStringTMap<string | number>;
}) => Promise<T>;
