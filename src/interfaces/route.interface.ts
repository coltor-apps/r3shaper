import { Methods } from './../enums/methods.enum';

export interface RouteInterface {
  method: Methods;
  path: string;
}
