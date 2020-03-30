import { KeyStringTMap } from './';
export declare type Resource = (options?: {
    body?: any;
    headers?: object;
    params?: KeyStringTMap<string | number>;
    queryParams?: KeyStringTMap<string | number>;
}) => Promise<any>;
