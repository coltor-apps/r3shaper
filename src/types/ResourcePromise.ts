import { ApiProvider, Interceptors } from './';
import { Methods } from './Methods';

export type ResourcePromise = (options: {
  apiProvider: ApiProvider;
  method: Methods;
  path: string;
  body: any;
  interceptors: Interceptors;
  headers?: object;
}) => Promise<any>;
