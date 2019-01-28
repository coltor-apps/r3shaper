import { FetchBodyInterface } from './fetch-body.interface';

export interface ResourceInterface {
  fetch(params: FetchBodyInterface): Promise<any>;
}
