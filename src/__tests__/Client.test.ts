import { Client } from '../Client';
import { Methods } from '../enums/methods.enum';

test('Test client initialization', () => {
  const basePath = '/';

  const headers = {
    'Content-Type': 'application/json',
  };

  const apiProvider = () => null;

  const client = new Client({
    basePath,
    headers,
    apiProvider,
  });

  expect(client.basePath).toBe(basePath);
  expect(client.headers).toEqual(headers);
  expect(client.apiProvider).toEqual(apiProvider);
});

test('Test client resource methods', () => {
  const data = {
    foo: 'bar',
  };

  const client = new Client({
    basePath: 'host',
    apiProvider: (options, onError, onSuccess) => onSuccess({ data, options }),
  });

  return Promise.all([
    client
      .get('/')()
      .then(response => {
        expect(response.data).toEqual(data);
        expect(response.options).toEqual({
          path: 'host/',
          method: 'GET',
          body: undefined,
          params: undefined,
          headers: {},
        });
      }),
    client
      .head('/')()
      .then(response => {
        expect(response.data).toEqual(data);
        expect(response.options).toEqual({
          path: 'host/',
          method: 'HEAD',
          body: undefined,
          params: undefined,
          headers: {},
        });
      }),
    client
      .post('/')()
      .then(response => {
        expect(response.data).toEqual(data);
        expect(response.options).toEqual({
          path: 'host/',
          method: 'POST',
          body: undefined,
          params: undefined,
          headers: {},
        });
      }),
    client
      .put('/')()
      .then(response => {
        expect(response.data).toEqual(data);
        expect(response.options).toEqual({
          path: 'host/',
          method: 'PUT',
          body: undefined,
          params: undefined,
          headers: {},
        });
      }),
    client
      .delete('/')()
      .then(response => {
        expect(response.data).toEqual(data);
        expect(response.options).toEqual({
          path: 'host/',
          method: 'DELETE',
          body: undefined,
          params: undefined,
          headers: {},
        });
      }),
    client
      .connect('/')()
      .then(response => {
        expect(response.data).toEqual(data);
        expect(response.options).toEqual({
          path: 'host/',
          method: 'CONNECT',
          body: undefined,
          params: undefined,
          headers: {},
        });
      }),
    client
      .options('/')()
      .then(response => {
        expect(response.data).toEqual(data);
        expect(response.options).toEqual({
          path: 'host/',
          method: 'OPTIONS',
          body: undefined,
          params: undefined,
          headers: {},
        });
      }),
    client
      .trace('/')()
      .then(response => {
        expect(response.data).toEqual(data);
        expect(response.options).toEqual({
          path: 'host/',
          method: 'TRACE',
          body: undefined,
          params: undefined,
          headers: {},
        });
      }),
    client
      .patch('/')()
      .then(response => {
        expect(response.data).toEqual(data);
        expect(response.options).toEqual({
          path: 'host/',
          method: 'PATCH',
          body: undefined,
          params: undefined,
          headers: {},
        });
      }),
  ]);
});

test('Test client resource params', () => {
  const data = {
    foo: 'bar',
  };

  const client = new Client({
    basePath: 'host',
    apiProvider: (options, onError, onSuccess) => onSuccess({ data, options }),
  });

  return client
    .post('/{id}')({
      params: {
        id: 1,
      },
    })
    .then(response => {
      expect(response.data).toEqual(data);
      expect(response.options).toEqual({
        path: 'host/1',
        method: 'POST',
        body: undefined,
        params: {
          id: 1,
        },
        headers: {},
      });
    });
});

test('Test client resource interceptors', () => {
  const data = {
    foo: 'bar',
  };

  const client = new Client({
    basePath: 'host',
    apiProvider: (options, onError, onSuccess) => onSuccess({ data, options }),
  });

  return client
    .post('/', {
      onRequest: ({ bar }) => ({ bar }),
      onResponse: ({ data, ...rest }) => ({
        ...rest,
        data: { ...data, foo: 'baz' },
      }),
    })({
      body: {
        bar: 'baz',
      },
    })
    .then(response => {
      expect(response.data).toEqual({
        ...data,
        foo: 'baz',
      });
      expect(response.options).toEqual({
        path: 'host/',
        method: 'POST',
        body: {
          bar: 'baz',
        },
        params: undefined,
        headers: {},
      });
    });
});

test('Test client static & instance headers merging', () => {
  const staticHeaders = {
    Accept: 'application/json',
  };

  const instanceHeaders = {
    'Content-Type': 'application/json',
  };

  Client.config.headers = staticHeaders;

  const client = new Client({
    headers: instanceHeaders,
    basePath: 'host',
    apiProvider: (options, onError, onSuccess) => onSuccess({ options }),
  });

  return client
    .get('/')()
    .then(({ options }) => {
      expect(options).toEqual({
        path: 'host/',
        method: 'GET',
        body: undefined,
        params: undefined,
        headers: { ...staticHeaders, ...instanceHeaders },
      });
    });
});

test('Test client resource generic output & options', () => {
  const client = new Client({
    basePath: 'host',
    apiProvider: (options, onError, onSuccess) =>
      onSuccess({
        foo: 'test',
      }),
  });

  type InputEntity = {
    foo: String;
  };

  type OutputEntity = {
    bar: String;
  };

  const normalizer = (data: InputEntity): OutputEntity => ({
    bar: data.foo,
  });

  return Promise.all([
    client
      .post<OutputEntity>('/', {
        onResponse: normalizer,
      })()
      .then(response => {
        expect(response).toEqual({
          bar: 'test',
        });
      }),

    client
      .post<OutputEntity, { params: { id: Number }; body: { test: Number } }>(
        '/{id}',
        {
          onResponse: normalizer,
        }
      )({
        params: { id: 1 },
        body: { test: 1}
      })
      .then(response => {
        expect(response).toEqual({
          bar: 'test',
        });
      }),

    client
      .post<OutputEntity, { params: { id: Number } } | void>('/{id}', {
        onResponse: normalizer,
      })()
      .then(response => {
        expect(response).toEqual({
          bar: 'test',
        });
      }),

    client
      .post<OutputEntity, { params?: { id: Number } }>('/{id}', {
        onResponse: normalizer,
      })({})
      .then(response => {
        expect(response).toEqual({
          bar: 'test',
        });
      }),
  ]);
});

test('Test client resource with meta', () => {
  const data = {
    foo: 'bar',
  };

  const meta = {
    userType: 'generalissimus',
  };

  const client = new Client({
    basePath: 'host',
    apiProvider: (options, onError, onSuccess) => onSuccess(options),
  });

  return Promise.all([
    client
      .post('/')()
      .then(options => {
        expect(options.meta).toBe(undefined);
      }),
    client
      .post('/')({ meta })
      .then(options => {
        expect(options.meta).toEqual(meta);
      }),
    client
      .post('/', {
        onRequest: (body, clientMeta) => {
          expect(clientMeta).toEqual(meta);
          return body;
        },
      })({ meta, body: data })
      .then(options => {
        expect(options.meta).toEqual(meta);
      }),
    client
      .post('/', {
        onResponse: (body, clientMeta) => {
          expect(clientMeta).toEqual(meta);
          return body;
        },
      })({ meta, body: data })
      .then(options => {
        expect(options.meta).toEqual(meta);
      }),
  ]);
});
