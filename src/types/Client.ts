import { ClientResource } from './';

export type Client = {
  get: ClientResource;
  head: ClientResource;
  post: ClientResource;
  put: ClientResource;
  delete: ClientResource;
  options: ClientResource;
  patch: ClientResource;
  basePath?: string;
  headers?: object;
};
