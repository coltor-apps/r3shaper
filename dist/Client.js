"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var methods_enum_1 = require("./enums/methods.enum");
var Resource_1 = require("./Resource");
var Route_1 = require("./Route");
var Client = /** @class */ (function () {
    function Client(config) {
        this.basePath = config.basePath || Client.config.basePath || '/';
        this.headers = __assign({}, Client.config.headers, config.headers);
        this.apiProvider = config.apiProvider || Client.config.apiProvider;
    }
    Client.prototype.get = function (path, transformers) {
        if (transformers === void 0) { transformers = {}; }
        return this._createResource(new Route_1.Route(methods_enum_1.Methods.GET, path), transformers.onRequest, transformers.onResponse);
    };
    Client.prototype.head = function (path, transformers) {
        if (transformers === void 0) { transformers = {}; }
        return this._createResource(new Route_1.Route(methods_enum_1.Methods.HEAD, path), transformers.onRequest, transformers.onResponse);
    };
    Client.prototype.post = function (path, transformers) {
        if (transformers === void 0) { transformers = {}; }
        return this._createResource(new Route_1.Route(methods_enum_1.Methods.POST, path), transformers.onRequest, transformers.onResponse);
    };
    Client.prototype.put = function (path, transformers) {
        if (transformers === void 0) { transformers = {}; }
        return this._createResource(new Route_1.Route(methods_enum_1.Methods.PUT, path), transformers.onRequest, transformers.onResponse);
    };
    Client.prototype.delete = function (path, transformers) {
        if (transformers === void 0) { transformers = {}; }
        return this._createResource(new Route_1.Route(methods_enum_1.Methods.DELETE, path), transformers.onRequest, transformers.onResponse);
    };
    Client.prototype.connect = function (path, transformers) {
        if (transformers === void 0) { transformers = {}; }
        return this._createResource(new Route_1.Route(methods_enum_1.Methods.CONNECT, path), transformers.onRequest, transformers.onResponse);
    };
    Client.prototype.options = function (path, transformers) {
        if (transformers === void 0) { transformers = {}; }
        return this._createResource(new Route_1.Route(methods_enum_1.Methods.OPTIONS, path), transformers.onRequest, transformers.onResponse);
    };
    Client.prototype.trace = function (path, transformers) {
        if (transformers === void 0) { transformers = {}; }
        return this._createResource(new Route_1.Route(methods_enum_1.Methods.TRACE, path), transformers.onRequest, transformers.onResponse);
    };
    Client.prototype.patch = function (path, transformers) {
        if (transformers === void 0) { transformers = {}; }
        return this._createResource(new Route_1.Route(methods_enum_1.Methods.PATCH, path), transformers.onRequest, transformers.onResponse);
    };
    Client.prototype._createResource = function (route, onRequest, onResponse) {
        return new Resource_1.Resource(this, route, onRequest, onResponse).fetch;
    };
    Client.config = {
        apiProvider: function () { return null; },
    };
    return Client;
}());
exports.Client = Client;
