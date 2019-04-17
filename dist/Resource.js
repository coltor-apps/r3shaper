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
var Resource = /** @class */ (function () {
    function Resource(client, route, onRequest, onResponse) {
        if (onRequest === void 0) { onRequest = function (data) { return data; }; }
        if (onResponse === void 0) { onResponse = function (response) { return response; }; }
        var _this = this;
        this.client = client;
        this.route = route;
        this.fetch = function (_a) {
            var _b = _a === void 0 ? {} : _a, body = _b.body, params = _b.params, queryParams = _b.queryParams, headers = _b.headers, meta = _b.meta;
            var normalizedBody = body ? _this.interceptors.onRequest(body, meta) : undefined;
            var fullPath = "" + _this.client.basePath + _this.route.path;
            if (params) {
                fullPath = _this._replacePathParams(params, fullPath);
            }
            if (queryParams) {
                fullPath = _this._injectQueryParams(queryParams, fullPath);
            }
            var requestOptions = {
                body: normalizedBody,
                path: fullPath,
                method: _this.route.method,
                headers: __assign({}, _this.client.headers, headers),
                params: params,
                meta: meta,
            };
            return new Promise(function (resolve, reject) {
                _this.client.apiProvider(requestOptions, reject, function (response) {
                    return resolve(_this.interceptors.onResponse(response, meta));
                });
            });
        };
        this.route = route;
        this.interceptors = { onRequest: onRequest, onResponse: onResponse };
    }
    Resource.prototype._replacePathParams = function (params, path) {
        if (params === void 0) { params = {}; }
        var paramsReplacer = function (replaceablePath, key) {
            return replaceablePath.replace(new RegExp("{" + key + "}", 'g'), params[key]);
        };
        return Object.keys(params).reduce(paramsReplacer, path);
    };
    Resource.prototype._injectQueryParams = function (queryParams, path) {
        if (queryParams === void 0) { queryParams = {}; }
        var queryParamsAsString = Object.keys(queryParams)
            .map(function (key) { return key + "=" + encodeURIComponent(queryParams[key]); })
            .join('&');
        return path + "?" + queryParamsAsString;
    };
    return Resource;
}());
exports.Resource = Resource;
