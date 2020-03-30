import { Client } from '../types';

export const clientMethods = [
  'get',
  'head',
  'post',
  'put',
  'delete',
  'connect',
  'options',
  'trace',
  'patch',
] as Exclude<keyof Client, 'basePath' | 'headers'>[];
