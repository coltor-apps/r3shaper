import { KeyStringInterface } from './interfaces/key-string.interface';
import { ClientConfigInterface } from './interfaces/client-config.interface';
import { RouteInterface } from './interfaces/Route.interface';
import { ClientInterface } from './interfaces/client.interface';
import { ApiProviderInterface } from './interfaces/api-provider.interface';
import { FetchFunctionInterface } from './interfaces/fetch-function.interface';
import { TransformersInterface } from './interfaces/transformers.interface';
import { Methods } from './enums/methods.enum';
import { Resource } from './Resource';
import { Route } from './Route';

export class Client implements ClientInterface {
  static config: ClientConfigInterface;

  public basePath: string;
  public headers: KeyStringInterface;
  public apiProvider: ApiProviderInterface;

  constructor(config: ClientConfigInterface) {
    const staticConfig = Client.config || {};

    this.basePath = config.basePath || staticConfig.basePath || '/';
    this.headers = config.headers || staticConfig.headers || {};
    if (!config.apiProvider && !staticConfig.apiProvider) {
      throw new Error('API Provider function is required');
    }
    this.apiProvider = config.apiProvider || staticConfig.apiProvider;
  }

  public get(path: string, transformers: TransformersInterface = {}) {
    return this._createResource(
      new Route(Methods.GET, path),
      transformers.onRequest,
      transformers.onResponse
    );
  }

  public head(path: string, transformers: TransformersInterface = {}) {
    return this._createResource(
      new Route(Methods.HEAD, path),
      transformers.onRequest,
      transformers.onResponse
    );
  }

  public post(path: string, transformers: TransformersInterface = {}) {
    return this._createResource(
      new Route(Methods.POST, path),
      transformers.onRequest,
      transformers.onResponse
    );
  }

  public put(path: string, transformers: TransformersInterface = {}) {
    return this._createResource(
      new Route(Methods.PUT, path),
      transformers.onRequest,
      transformers.onResponse
    );
  }

  public delete(path: string, transformers: TransformersInterface = {}) {
    return this._createResource(
      new Route(Methods.DELETE, path),
      transformers.onRequest,
      transformers.onResponse
    );
  }

  public connect(path: string, transformers: TransformersInterface = {}) {
    return this._createResource(
      new Route(Methods.CONNECT, path),
      transformers.onRequest,
      transformers.onResponse
    );
  }

  public options(path: string, transformers: TransformersInterface = {}) {
    return this._createResource(
      new Route(Methods.OPTIONS, path),
      transformers.onRequest,
      transformers.onResponse
    );
  }

  public trace(path: string, transformers: TransformersInterface = {}) {
    return this._createResource(
      new Route(Methods.TRACE, path),
      transformers.onRequest,
      transformers.onResponse
    );
  }

  public patch(path: string, transformers: TransformersInterface = {}) {
    return this._createResource(
      new Route(Methods.PATCH, path),
      transformers.onRequest,
      transformers.onResponse
    );
  }

  private _createResource(
    route: RouteInterface,
    onRequest?: Function,
    onResponse?: Function
  ): FetchFunctionInterface {
    return new Resource(this, route, onRequest, onResponse).fetch;
  }
}
