"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replacePathParams = function (params, path) {
    if (params === void 0) { params = {}; }
    return Object.keys(params).reduce(function (replaceablePath, key) {
        return replaceablePath.replace(new RegExp("{" + key + "}", 'g'), params[key]);
    }, path);
};
exports.addQueryParams = function (queryParams, path) {
    if (queryParams === void 0) { queryParams = {}; }
    var query = Object.keys(queryParams)
        .map(function (key) { return key + "=" + encodeURIComponent(queryParams[key]); })
        .join('&');
    return query ? path + "?" + query : path;
};
