import { ClientConfigInterface } from './client-config.interface';
import { FetchFunctionInterface } from './fetch-function.interface';
import { TransformersInterface } from './transformers.interface';
import { FetchBodyInterface } from './fetch-body.interface';

export interface ClientInterface extends ClientConfigInterface {
  get<T, S = FetchBodyInterface | void>(
    path: string,
    transformers: TransformersInterface<T>
  ): FetchFunctionInterface<T, S>;
  head<T, S = FetchBodyInterface | void>(
    path: string,
    transformers: TransformersInterface<T>
  ): FetchFunctionInterface<T, S>;
  post<T, S = FetchBodyInterface | void>(
    path: string,
    transformers: TransformersInterface<T>
  ): FetchFunctionInterface<T, S>;
  put<T, S = FetchBodyInterface | void>(
    path: string,
    transformers: TransformersInterface<T>
  ): FetchFunctionInterface<T, S>;
  delete<T, S = FetchBodyInterface | void>(
    path: string,
    transformers: TransformersInterface<T>
  ): FetchFunctionInterface<T, S>;
  connect<T, S = FetchBodyInterface | void>(
    path: string,
    transformers: TransformersInterface<T>
  ): FetchFunctionInterface<T, S>;
  options<T, S = FetchBodyInterface | void>(
    path: string,
    transformers: TransformersInterface<T>
  ): FetchFunctionInterface<T, S>;
  trace<T, S = FetchBodyInterface | void>(
    path: string,
    transformers: TransformersInterface<T>
  ): FetchFunctionInterface<T, S>;
  patch<T, S = FetchBodyInterface | void>(
    path: string,
    transformers: TransformersInterface<T>
  ): FetchFunctionInterface<T, S>;
}
