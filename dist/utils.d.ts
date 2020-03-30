import { KeyStringTMap } from './types';
export declare const replacePathParams: (params: KeyStringTMap<any> | undefined, path: string) => string;
export declare const addQueryParams: (queryParams: KeyStringTMap<any> | undefined, path: string) => string;
