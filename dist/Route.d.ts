import { Methods } from './enums/methods.enum';
import { RouteInterface } from './interfaces/route.interface';
export declare class Route implements RouteInterface {
    method: Methods;
    path: string;
    constructor(method: Methods, path: string);
}
