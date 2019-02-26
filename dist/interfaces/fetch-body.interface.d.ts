import { MetaType } from '../types/meta.type';
import { KeyStringInterface } from './key-string.interface';
export interface FetchBodyInterface {
    body?: Object;
    params?: KeyStringInterface;
    queryParams?: KeyStringInterface;
    headers?: KeyStringInterface;
    meta?: MetaType;
}
