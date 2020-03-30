import { ApiProvider, Client } from './';
export declare type ClientOptions = {
    (options: {
        basePath?: string;
        headers?: object;
        apiProvider: ApiProvider;
    }): Client;
};
