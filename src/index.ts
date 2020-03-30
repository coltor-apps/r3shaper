import {
  ResourcePromise,
  ResourceOptions,
  ApiProvider,
  ClientResource,
  ClientOptions,
  Methods,
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

export const createClient: ClientOptions = options => {
  const apiProvider: ApiProvider = (config, ...callbacks) =>
    options.apiProvider(
      {
        ...config,
        path: options.basePath
          ? `${options.basePath}${config.path}`
          : config.path,
        headers: { ...options.headers, ...config.headers },
      },
      ...callbacks
    );

  return {
    basePath: options.basePath,
    headers: options.headers,
    get: clientResource(apiProvider, 'GET'),
    head: clientResource(apiProvider, 'HEAD'),
    post: clientResource(apiProvider, 'POST'),
    put: clientResource(apiProvider, 'PUT'),
    delete: clientResource(apiProvider, 'DELETE'),
    options: clientResource(apiProvider, 'OPTIONS'),
    patch: clientResource(apiProvider, 'PATCH'),
  };
};
