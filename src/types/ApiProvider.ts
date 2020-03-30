import { Methods } from '../enums';
import { ResponseCallback } from './';

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
