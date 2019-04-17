import { MetaType } from '../types/meta.type';
export interface TransformersInterface {
    onRequest?: (data: any, meta?: MetaType) => any;
    onResponse?: (data: any, meta?: MetaType) => any;
}
