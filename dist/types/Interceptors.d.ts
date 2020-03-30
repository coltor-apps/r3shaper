export declare type Interceptors<T = any> = {
    onRequest?: (body: any) => any;
    onResponse?: (body: any) => T;
};
