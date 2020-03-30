import { Interceptors, Resource } from './';

export type ClientResource = {
  <T = any>(path: string, interceptors?: Interceptors): Resource<T>;
};
