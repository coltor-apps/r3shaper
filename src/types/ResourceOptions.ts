import { ApiProvider, Interceptors, Resource } from './';
import { Methods } from './Methods';

export type ResourceOptions = {
  <T>(
    apiProvider: ApiProvider,
    method: Methods,
    path: string,
    interceptors?: Interceptors<T>
  ): Resource<T>;
};
