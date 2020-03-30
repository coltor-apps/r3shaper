import { ResponseCallback } from './';
import { Methods } from './Methods';

export type ApiProvider = {
  (
    options: {
      path: string;
      body?: any;
      headers?: object;
      method?: Methods;
      meta?: any;
    },
    onSuccess: ResponseCallback,
    onError: ResponseCallback
  ): any;
};
