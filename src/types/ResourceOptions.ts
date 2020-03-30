import { Methods } from '../enums';
import { ApiProvider, Interceptors, Resource } from './';

export type ResourceOptions = {
  (
    apiProvider: ApiProvider,
    method: Methods,
    path: string,
    interceptors?: Interceptors
  ): Resource;
};
