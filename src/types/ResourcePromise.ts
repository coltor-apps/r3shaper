import { Methods } from '../enums';
import { ApiProvider, Interceptors } from './';

export type ResourcePromise = (options: {
  apiProvider: ApiProvider;
  method: Methods;
  path: string;
  body: any;
  interceptors: Interceptors;
  headers?: object;
}) => Promise<any>;
