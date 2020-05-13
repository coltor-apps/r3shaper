import { createClient } from '../';
import { clientMethods } from './clientMethods';

describe('Client', () => {
  test('It can basically initialize', () => {
    const client = createClient({
      apiProvider: () => {},
    });

    clientMethods.forEach((method) =>
      expect(client[method]).toBeInstanceOf(Function)
    );
  });

  test('It resolves with base path and headers', () => {
    const client = createClient({
      basePath: 'api',
      headers: {
        'Content-Type': 'application/json',
      },
      apiProvider: ({ path, headers }, onSuccess) =>
        onSuccess({
          path,
          headers,
        }),
    });

    clientMethods.forEach(async (method) => {
      const { path, headers } = await client[method]('/')();

      expect(path).toEqual('api/');

      expect(headers).toEqual({
        'Content-Type': 'application/json',
      });
    });
  });

  test('It resolves without base path and headers', () => {
    const client = createClient({
      apiProvider: ({ path, headers }, onSuccess) =>
        onSuccess({
          path,
          headers,
        }),
    });

    clientMethods.forEach(async (method) => {
      const { path, headers } = await client[method]('/')();

      expect(path).toEqual('/');

      expect(headers).toEqual({});
    });
  });

  test('It resolves with merged headers', () => {
    const client = createClient({
      headers: {
        'Content-Type': 'application/json',
      },
      apiProvider: ({ headers }, onSuccess) =>
        onSuccess({
          headers,
        }),
    });

    clientMethods.forEach(async (method) => {
      const { headers } = await client[method]('/')({
        headers: {
          header: 'test',
        },
      });

      expect(headers).toEqual({
        'Content-Type': 'application/json',
        header: 'test',
      });

      const { headers: overwrittenHeaders } = await client[method]('/')({
        headers: {
          'Content-Type': 'test',
        },
      });

      expect(overwrittenHeaders).toEqual({
        'Content-Type': 'test',
      });
    });
  });

  test('It resolves with body', () => {
    const client = createClient({
      apiProvider: ({ body }, onSuccess) =>
        onSuccess({
          body,
        }),
    });

    clientMethods.forEach(async (method) => {
      const { body } = await client[method]('/')({
        body: {
          test: 'test',
        },
      });

      expect(body).toEqual({
        test: 'test',
      });
    });
  });

  test('It resolves with meta', () => {
    const client = createClient({
      apiProvider: ({ meta }, onSuccess) => {
        expect(meta).toEqual('test');

        onSuccess(null);
      },
    });

    clientMethods.forEach(async (method) => {
      await client[method]('/')({
        meta: 'test',
      });
    });
  });
});
