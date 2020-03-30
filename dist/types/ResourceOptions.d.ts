import { Methods } from '../enums';
import { ApiProvider, Interceptors, Resource } from './';
export declare type ResourceOptions = {
    <T>(apiProvider: ApiProvider, method: Methods, path: string, interceptors?: Interceptors): Resource<T>;
};
