import { Methods } from '../enums';
import { ApiProvider, Interceptors, Resource } from './';

export type ResourceOptions = {
  <T>(
    apiProvider: ApiProvider,
    method: Methods,
    path: string,
    interceptors?: Interceptors<T>
  ): Resource<T>;
};
