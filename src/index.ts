import { Methods } from './enums';
import {
  ResourcePromise,
  ResourceOptions,
  ApiProvider,
  ClientResource,
  ClientOptions,
} from './types';
import { addQueryParams, replacePathParams } from './utils';

const resourcePromise: ResourcePromise = ({
  apiProvider,
  method,
  path,
  body,
  interceptors,
  headers,
}) =>
  new Promise((resolve, reject) =>
    apiProvider(
      {
        path,
        body,
        headers,
        method,
      },
      data => {
        resolve(interceptors.onResponse ? interceptors.onResponse(data) : data);
      },
      reject
    )
  );

const createResource: ResourceOptions = (
  apiProvider,
  method,
  path,
  interceptors = {}
) => (options = {}) =>
  resourcePromise({
    apiProvider,
    method,
    path: addQueryParams(
      options.queryParams,
      replacePathParams(options.params, path)
    ),
    body: interceptors.onRequest
      ? interceptors.onRequest(options.body)
      : options.body,
    interceptors,
    headers: options.headers,
  });

const clientResource: (
  apiProvider: ApiProvider,
  method: Methods
) => ClientResource = (apiProvider, method) => (path, interceptors) =>
  createResource(apiProvider, method, path, interceptors);

export const createClient: ClientOptions = options => ({
  basePath: options.basePath,
  headers: options.headers,
  get: clientResource(options.apiProvider, Methods.GET),
  head: clientResource(options.apiProvider, Methods.HEAD),
  post: clientResource(options.apiProvider, Methods.POST),
  put: clientResource(options.apiProvider, Methods.PUT),
  delete: clientResource(options.apiProvider, Methods.DELETE),
  connect: clientResource(options.apiProvider, Methods.CONNECT),
  options: clientResource(options.apiProvider, Methods.OPTIONS),
  trace: clientResource(options.apiProvider, Methods.TRACE),
  patch: clientResource(options.apiProvider, Methods.PATCH),
});
