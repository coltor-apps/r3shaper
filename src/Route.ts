import { Methods } from './enums/methods.enum';
import { RouteInterface } from './interfaces/route.interface';

export class Route implements RouteInterface {
  constructor(public method: Methods, public path: string) {}
}
