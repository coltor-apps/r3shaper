import { KeyStringInterface } from './interfaces/key-string.interface';
import { ClientConfigInterface } from './interfaces/client-config.interface';
import { ClientInterface } from './interfaces/client.interface';
import { ApiProviderInterface } from './interfaces/api-provider.interface';
import { FetchFunctionInterface } from './interfaces/fetch-function.interface';
import { TransformersInterface } from './interfaces/transformers.interface';
export declare class Client implements ClientInterface {
    static config: ClientConfigInterface;
    basePath: string;
    headers: KeyStringInterface;
    apiProvider: ApiProviderInterface;
    constructor(config: ClientConfigInterface);
    get(path: string, transformers?: TransformersInterface): FetchFunctionInterface;
    head(path: string, transformers?: TransformersInterface): FetchFunctionInterface;
    post(path: string, transformers?: TransformersInterface): FetchFunctionInterface;
    put(path: string, transformers?: TransformersInterface): FetchFunctionInterface;
    delete(path: string, transformers?: TransformersInterface): FetchFunctionInterface;
    connect(path: string, transformers?: TransformersInterface): FetchFunctionInterface;
    options(path: string, transformers?: TransformersInterface): FetchFunctionInterface;
    trace(path: string, transformers?: TransformersInterface): FetchFunctionInterface;
    patch(path: string, transformers?: TransformersInterface): FetchFunctionInterface;
    private _createResource;
}
