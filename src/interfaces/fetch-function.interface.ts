import { FetchBodyInterface } from './fetch-body.interface';

export interface FetchFunctionInterface<
  T = any,
  S = FetchBodyInterface | void
> {
  (options: S): Promise<T>;
}
