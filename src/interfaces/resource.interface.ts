import { FetchBodyInterface } from './fetch-body.interface';

export interface ResourceInterface<T = any, S = FetchBodyInterface | void> {
  fetch(options: S): Promise<T>;
}
