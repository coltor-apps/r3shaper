import { Interceptors, Resource } from './';
export declare type ClientResource = {
    (path: string, interceptors?: Interceptors): Resource;
};
