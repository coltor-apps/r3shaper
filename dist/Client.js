"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const methods_enum_1 = require("./enums/methods.enum");
const Resource_1 = require("./Resource");
const Route_1 = require("./Route");
class Client {
    constructor(config) {
        this.basePath = config.basePath || Client.config.basePath || '/';
        this.headers = Object.assign({}, Client.config.headers, config.headers);
        this.apiProvider = config.apiProvider || Client.config.apiProvider;
    }
    get(path, transformers = {}) {
        return this._createResource(new Route_1.Route(methods_enum_1.Methods.GET, path), transformers.onRequest, transformers.onResponse);
    }
    head(path, transformers = {}) {
        return this._createResource(new Route_1.Route(methods_enum_1.Methods.HEAD, path), transformers.onRequest, transformers.onResponse);
    }
    post(path, transformers = {}) {
        return this._createResource(new Route_1.Route(methods_enum_1.Methods.POST, path), transformers.onRequest, transformers.onResponse);
    }
    put(path, transformers = {}) {
        return this._createResource(new Route_1.Route(methods_enum_1.Methods.PUT, path), transformers.onRequest, transformers.onResponse);
    }
    delete(path, transformers = {}) {
        return this._createResource(new Route_1.Route(methods_enum_1.Methods.DELETE, path), transformers.onRequest, transformers.onResponse);
    }
    connect(path, transformers = {}) {
        return this._createResource(new Route_1.Route(methods_enum_1.Methods.CONNECT, path), transformers.onRequest, transformers.onResponse);
    }
    options(path, transformers = {}) {
        return this._createResource(new Route_1.Route(methods_enum_1.Methods.OPTIONS, path), transformers.onRequest, transformers.onResponse);
    }
    trace(path, transformers = {}) {
        return this._createResource(new Route_1.Route(methods_enum_1.Methods.TRACE, path), transformers.onRequest, transformers.onResponse);
    }
    patch(path, transformers = {}) {
        return this._createResource(new Route_1.Route(methods_enum_1.Methods.PATCH, path), transformers.onRequest, transformers.onResponse);
    }
    _createResource(route, onRequest, onResponse) {
        return new Resource_1.Resource(this, route, onRequest, onResponse).fetch;
    }
}
Client.config = {
    apiProvider: () => null,
};
exports.Client = Client;
