import { KeyStringInterface } from './key-string.interface';
import { ApiProviderInterface } from './api-provider.interface';

export interface ClientConfigInterface {
  basePath?: string;
  headers?: KeyStringInterface;
  apiProvider: ApiProviderInterface;
}
