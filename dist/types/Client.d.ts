import { ClientResource } from './';
export declare type Client = {
    get: ClientResource;
    head: ClientResource;
    post: ClientResource;
    put: ClientResource;
    delete: ClientResource;
    connect: ClientResource;
    options: ClientResource;
    trace: ClientResource;
    patch: ClientResource;
    basePath?: string;
    headers?: object;
};
