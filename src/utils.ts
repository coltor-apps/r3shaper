import { KeyStringTMap } from './types';

export const replacePathParams = (
  params: KeyStringTMap<any> = {},
  path: string
) =>
  Object.keys(params).reduce(
    (replaceablePath: string, key: string) =>
      replaceablePath.replace(new RegExp(`{${key}}`, 'g'), params[key]),
    path
  );

export const addQueryParams = (
  queryParams: KeyStringTMap<any> = {},
  path: string
) => {
  const query = Object.keys(queryParams)
    .map(key => `${key}=${encodeURIComponent(queryParams[key])}`)
    .join('&');

  return query ? `${path}?${query}` : path;
};
