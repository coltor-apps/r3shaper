import { MetaType } from '../types/meta.type';

export interface TransformersInterface<T = any> {
  onRequest?: (data: any, meta?: MetaType) => any;
  onResponse?: (data: any, meta?: MetaType) => T;
}
