import { ApiProvider, Client } from './';

export type ClientOptions = {
  (options: {
    basePath?: string;
    headers?: object;
    apiProvider: ApiProvider;
  }): Client;
};
