import { ApiOptionsInterface } from './api-options.interface';

export interface ApiProviderInterface {
  (
    options: ApiOptionsInterface,
    errorCallback: Function,
    successCallback: Function
  ): void;
}
