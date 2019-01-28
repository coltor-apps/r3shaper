import { ResourceInterface } from './interfaces/resource.interface';
import { FetchFunctionInterface } from './interfaces/fetch-function.interface';
import { Client } from './Client';
import { Route } from './Route';
export declare class Resource implements ResourceInterface {
    private client;
    private route;
    private interceptors;
    constructor(client: Client, route: Route, onRequest?: Function, onResponse?: Function);
    fetch: FetchFunctionInterface;
    private _replacePathParams;
    private _injectQueryParams;
}
