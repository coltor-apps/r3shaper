export type Interceptors = {
  onRequest?: (body: any) => any;
  onResponse?: (body: any) => any;
};
