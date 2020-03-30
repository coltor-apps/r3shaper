import { Interceptors, Resource } from './';

export type ClientResource = {
  (path: string, interceptors?: Interceptors): Resource;
};
