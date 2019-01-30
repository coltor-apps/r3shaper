import { FetchBodyInterface } from './fetch-body.interface';
export interface FetchFunctionInterface {
    (options?: FetchBodyInterface): Promise<any>;
}
