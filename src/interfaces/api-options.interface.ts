import { KeyStringInterface } from './key-string.interface';
import { Methods } from '../enums/methods.enum';

export interface ApiOptionsInterface {
  body?: any;
  path: string;
  method: Methods;
  headers?: KeyStringInterface;
  params?: KeyStringInterface;
}
