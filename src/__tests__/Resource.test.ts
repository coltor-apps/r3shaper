import { Client } from '../types';
import { createClient } from '../';
import { clientMethods } from './clientMethods';

describe('Resource', () => {
  test('It can be called', () => {
    const client = createClient({
      apiProvider: () => {},
    });

    clientMethods.forEach(async method =>
      expect(client[method]('/')).toBeInstanceOf(Function)
    );
  });

  test('It resolves data', () => {
    const client = createClient({
      apiProvider: (options, onSuccess) => {
        onSuccess({ data: 'test' });
      },
    });

    clientMethods.forEach(async method => {
      const resource = client[method]('/');

      const { data } = await resource();

      expect(data).toEqual('test');
    });
  });

  test('It resolves data with generic', () => {
    const client = createClient({
      apiProvider: (options, onSuccess) => {
        onSuccess({ data: 'test' });
      },
    });

    clientMethods.forEach(async method => {
      const resource = client[method]<{ data: string }>('/');

      const { data } = await resource();

      expect(typeof data).toEqual('string');

      expect(data).toEqual('test');
    });
  });

  test('It resolves mapped data with generic', () => {
    const client = createClient({
      apiProvider: (options, onSuccess) => {
        onSuccess({ data: 'test' });
      },
    });

    clientMethods.forEach(async method => {
      const resource = client[method]<{ data: string }>('/', {
        onResponse: () => ({
          data: 'test2',
        }),
      });

      const { data } = await resource();

      expect(typeof data).toEqual('string');

      expect(data).toEqual('test2');
    });
  });
});
