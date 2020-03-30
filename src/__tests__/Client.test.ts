import { createClient } from '../';
import { clientMethods } from './clientMethods';

describe('Client', () => {
  test('It can basically initialize', () => {
    const client = createClient({
      apiProvider: () => {},
    });

    clientMethods.forEach(method =>
      expect(client[method]).toBeInstanceOf(Function)
    );
  });

  test('It can initialize with base path and headers', () => {
    const basePath = '/';

    const headers = {
      'Content-Type': 'application/json',
    };

    const client = createClient({
      basePath,
      headers,
      apiProvider: () => {},
    });

    expect(client.basePath).toEqual(basePath);

    expect(client.headers).toEqual(headers);
  });
});
