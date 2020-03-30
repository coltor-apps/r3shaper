import { Methods } from '../enums';
import { ResponseCallback } from './';
export declare type ApiProvider = {
    (options: {
        path: string;
        body?: any;
        headers?: object;
        method?: Methods;
        meta?: any;
    }, onSuccess: ResponseCallback, onError: ResponseCallback): any;
};
