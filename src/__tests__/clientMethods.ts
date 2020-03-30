import { Client } from '../types';

export const clientMethods = [
  'get',
  'head',
  'post',
  'put',
  'delete',
  'options',
  'patch',
] as Exclude<keyof Client, 'basePath' | 'headers'>[];
