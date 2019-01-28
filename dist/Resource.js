"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Resource {
    constructor(client, route, onRequest = (data) => data, onResponse = (response) => response) {
        this.client = client;
        this.route = route;
        this.fetch = ({ body, params, queryParams, headers, } = {}) => {
            const normalizedBody = body ? this.interceptors.onRequest(body) : undefined;
            let fullPath = `${this.client.basePath}${this.route.path}`;
            if (params) {
                fullPath = this._replacePathParams(params, fullPath);
            }
            if (queryParams) {
                fullPath = this._injectQueryParams(queryParams, fullPath);
            }
            const requestOptions = {
                body: normalizedBody,
                path: fullPath,
                method: this.route.method,
                headers: Object.assign({}, this.client.headers, headers),
                params: params,
            };
            return new Promise((resolve, reject) => {
                this.client.apiProvider(requestOptions, reject, (response) => resolve(this.interceptors.onResponse(response)));
            });
        };
        this.route = route;
        this.interceptors = { onRequest, onResponse };
    }
    _replacePathParams(params = {}, path) {
        const paramsReplacer = (replaceablePath, key) => replaceablePath.replace(new RegExp(`{${key}}`, 'g'), params[key]);
        return Object.keys(params).reduce(paramsReplacer, path);
    }
    _injectQueryParams(queryParams = {}, path) {
        const queryParamsAsString = Object.keys(queryParams)
            .map(key => `${key}=${encodeURIComponent(queryParams[key])}`)
            .join('&');
        return `${path}?${queryParamsAsString}`;
    }
}
exports.Resource = Resource;
