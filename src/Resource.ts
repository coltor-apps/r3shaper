import { InterceptorsInterface } from './interfaces/interceptors.interface';
import { ApiOptionsInterface } from './interfaces/api-options.interface';
import { ResourceInterface } from './interfaces/resource.interface';
import { FetchBodyInterface } from './interfaces/fetch-body.interface';
import { KeyStringInterface } from './interfaces/key-string.interface';
import { FetchFunctionInterface } from './interfaces/fetch-function.interface';
import { Client } from './Client';
import { Route } from './Route';

export class Resource implements ResourceInterface {
  private interceptors: InterceptorsInterface;

  constructor(
    private client: Client,
    private route: Route,
    onRequest: Function = (data: any) => data,
    onResponse: Function = (response: any) => response
  ) {
    this.route = route;
    this.interceptors = { onRequest, onResponse };
  }

  public fetch: FetchFunctionInterface = ({
    body,
    params,
    queryParams,
    headers,
    meta,
  }: FetchBodyInterface = {}) => {
    const normalizedBody = body ? this.interceptors.onRequest(body, meta) : undefined;

    let fullPath = `${this.client.basePath}${this.route.path}`;

    if (params) {
      fullPath = this._replacePathParams(params, fullPath);
    }

    if (queryParams) {
      fullPath = this._injectQueryParams(queryParams, fullPath);
    }

    const requestOptions: ApiOptionsInterface = {
      body: normalizedBody,
      path: fullPath,
      method: this.route.method,
      headers: { ...this.client.headers, ...headers },
      params: params,
      meta: meta,
    };

    return new Promise((resolve, reject) => {
      this.client.apiProvider(requestOptions, reject, (response: any) =>
        resolve(this.interceptors.onResponse(response, meta))
      );
    });
  };

  private _replacePathParams(params: KeyStringInterface = {}, path: string) {
    const paramsReplacer = (replaceablePath: string, key: string) =>
      replaceablePath.replace(new RegExp(`{${key}}`, 'g'), <string>params[key]);

    return Object.keys(params).reduce(paramsReplacer, path);
  }

  private _injectQueryParams(
    queryParams: KeyStringInterface = {},
    path: string
  ) {
    const queryParamsAsString = Object.keys(queryParams)
      .map(key => `${key}=${encodeURIComponent(<string>queryParams[key])}`)
      .join('&');

    return `${path}?${queryParamsAsString}`;
  }
}
