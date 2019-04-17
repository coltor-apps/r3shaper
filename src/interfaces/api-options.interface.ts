import { Methods } from '../enums/methods.enum';
import { MetaType } from '../types/meta.type';
import { KeyStringInterface } from './key-string.interface';

export interface ApiOptionsInterface {
  body?: any;
  path: string;
  method: Methods;
  headers?: KeyStringInterface;
  params?: KeyStringInterface;
  meta?: MetaType;
}
