"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const methods_enum_1 = require("./enums/methods.enum");
const Resource_1 = require("./Resource");
const Route_1 = require("./Route");
class Client {
    constructor(config) {
        const staticConfig = Client.config || {};
        this.basePath = config.basePath || staticConfig.basePath || '/';
        this.headers = config.headers || staticConfig.headers || {};
        if (!config.apiProvider && !staticConfig.apiProvider) {
            throw new Error('API Provider function is required');
        }
        this.apiProvider = config.apiProvider || staticConfig.apiProvider;
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
exports.Client = Client;
