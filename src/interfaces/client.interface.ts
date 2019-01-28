import { ClientConfigInterface } from './client-config.interface';
import { FetchFunctionInterface } from './fetch-function.interface';
import { TransformersInterface } from './transformers.interface';

export interface ClientInterface extends ClientConfigInterface {
  get(path: string, transformers: TransformersInterface): FetchFunctionInterface;
  head(path: string, transformers: TransformersInterface): FetchFunctionInterface;
  post(path: string, transformers: TransformersInterface): FetchFunctionInterface;
  put(path: string, transformers: TransformersInterface): FetchFunctionInterface;
  delete(path: string, transformers: TransformersInterface): FetchFunctionInterface;
  connect(path: string, transformers: TransformersInterface): FetchFunctionInterface;
  options(path: string, transformers: TransformersInterface): FetchFunctionInterface;
  trace(path: string, transformers: TransformersInterface): FetchFunctionInterface;
  patch(path: string, transformers: TransformersInterface): FetchFunctionInterface;
}
