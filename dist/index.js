"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("./enums");
var utils_1 = require("./utils");
var resourcePromise = function (_a) {
    var apiProvider = _a.apiProvider, method = _a.method, path = _a.path, body = _a.body, interceptors = _a.interceptors, headers = _a.headers;
    return new Promise(function (resolve, reject) {
        return apiProvider({
            path: path,
            body: body,
            headers: headers,
            method: method,
        }, function (data) {
            resolve(interceptors.onResponse ? interceptors.onResponse(data) : data);
        }, reject);
    });
};
var createResource = function (apiProvider, method, path, interceptors) {
    if (interceptors === void 0) { interceptors = {}; }
    return function (options) {
        if (options === void 0) { options = {}; }
        return resourcePromise({
            apiProvider: apiProvider,
            method: method,
            path: utils_1.addQueryParams(options.queryParams, utils_1.replacePathParams(options.params, path)),
            body: interceptors.onRequest
                ? interceptors.onRequest(options.body)
                : options.body,
            interceptors: interceptors,
            headers: options.headers,
        });
    };
};
var clientResource = function (apiProvider, method) { return function (path, interceptors) {
    return createResource(apiProvider, method, path, interceptors);
}; };
exports.createClient = function (options) { return ({
    basePath: options.basePath,
    headers: options.headers,
    get: clientResource(options.apiProvider, enums_1.Methods.GET),
    head: clientResource(options.apiProvider, enums_1.Methods.HEAD),
    post: clientResource(options.apiProvider, enums_1.Methods.POST),
    put: clientResource(options.apiProvider, enums_1.Methods.PUT),
    delete: clientResource(options.apiProvider, enums_1.Methods.DELETE),
    connect: clientResource(options.apiProvider, enums_1.Methods.CONNECT),
    options: clientResource(options.apiProvider, enums_1.Methods.OPTIONS),
    trace: clientResource(options.apiProvider, enums_1.Methods.TRACE),
    patch: clientResource(options.apiProvider, enums_1.Methods.PATCH),
}); };
