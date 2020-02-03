import { KeyStringInterface } from './interfaces/key-string.interface';
import { ClientConfigInterface } from './interfaces/client-config.interface';
import { RouteInterface } from './interfaces/route.interface';
import { ClientInterface } from './interfaces/client.interface';
import { ApiProviderInterface } from './interfaces/api-provider.interface';
import { FetchFunctionInterface } from './interfaces/fetch-function.interface';
import { TransformersInterface } from './interfaces/transformers.interface';
import { Methods } from './enums/methods.enum';
import { Resource } from './Resource';
import { Route } from './Route';
import { FetchBodyInterface } from './interfaces/fetch-body.interface';

export class Client implements ClientInterface {
  static config: ClientConfigInterface = {
    apiProvider: () => null,
  };

  public basePath: string;
  public headers: KeyStringInterface;
  public apiProvider: ApiProviderInterface;

  constructor(config: ClientConfigInterface) {
    this.basePath = config.basePath || Client.config.basePath || '/';
    this.headers = { ...Client.config.headers, ...config.headers };
    this.apiProvider = config.apiProvider || Client.config.apiProvider;
  }

  public get<T = any, S = FetchBodyInterface | void>(
    path: string,
    transformers: TransformersInterface<T> = {}
  ): FetchFunctionInterface<T, S> {
    return this._createResource<T, S>(
      new Route(Methods.GET, path),
      transformers.onRequest,
      transformers.onResponse
    );
  }

  public head<T = any, S = FetchBodyInterface | void>(
    path: string,
    transformers: TransformersInterface<T> = {}
  ): FetchFunctionInterface<T, S> {
    return this._createResource<T, S>(
      new Route(Methods.HEAD, path),
      transformers.onRequest,
      transformers.onResponse
    );
  }

  public post<T = any, S = FetchBodyInterface | void>(
    path: string,
    transformers: TransformersInterface<T> = {}
  ): FetchFunctionInterface<T, S> {
    return this._createResource<T, S>(
      new Route(Methods.POST, path),
      transformers.onRequest,
      transformers.onResponse
    );
  }

  public put<T = any, S = FetchBodyInterface | void>(
    path: string,
    transformers: TransformersInterface<T> = {}
  ): FetchFunctionInterface<T, S> {
    return this._createResource<T, S>(
      new Route(Methods.PUT, path),
      transformers.onRequest,
      transformers.onResponse
    );
  }

  public delete<T = any, S = FetchBodyInterface | void>(
    path: string,
    transformers: TransformersInterface<T> = {}
  ): FetchFunctionInterface<T, S> {
    return this._createResource<T, S>(
      new Route(Methods.DELETE, path),
      transformers.onRequest,
      transformers.onResponse
    );
  }

  public connect<T = any, S = FetchBodyInterface | void>(
    path: string,
    transformers: TransformersInterface<T> = {}
  ): FetchFunctionInterface<T, S> {
    return this._createResource<T, S>(
      new Route(Methods.CONNECT, path),
      transformers.onRequest,
      transformers.onResponse
    );
  }

  public options<T = any, S = FetchBodyInterface | void>(
    path: string,
    transformers: TransformersInterface<T> = {}
  ): FetchFunctionInterface<T, S> {
    return this._createResource<T, S>(
      new Route(Methods.OPTIONS, path),
      transformers.onRequest,
      transformers.onResponse
    );
  }

  public trace<T = any, S = FetchBodyInterface | void>(
    path: string,
    transformers: TransformersInterface<T> = {}
  ): FetchFunctionInterface<T, S> {
    return this._createResource<T, S>(
      new Route(Methods.TRACE, path),
      transformers.onRequest,
      transformers.onResponse
    );
  }

  public patch<T = any, S = FetchBodyInterface | void>(
    path: string,
    transformers: TransformersInterface<T> = {}
  ): FetchFunctionInterface<T, S> {
    return this._createResource<T, S>(
      new Route(Methods.PATCH, path),
      transformers.onRequest,
      transformers.onResponse
    );
  }

  private _createResource<T = any, S = FetchBodyInterface | void>(
    route: RouteInterface,
    onRequest?: Function,
    onResponse?: Function
  ) {
    return new Resource<T, S>(this, route, onRequest, onResponse).fetch;
  }
}
