import { Interceptors, Resource } from './';
export declare type ClientResource = {
    <T = any>(path: string, interceptors?: Interceptors): Resource<T>;
};
