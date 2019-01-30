import { Client } from '../Client';

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
