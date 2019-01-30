import { Route } from '../Route';
import { Resource } from '../Resource';
import { Client } from '../Client';
import { Methods } from '../enums/methods.enum';

test('Test resource initialization and fetching', () => {
  const data = {
    foo: 'bar',
  };

  const client = new Client({
    basePath: 'host',
    apiProvider: (options, onError, onSuccess) => onSuccess({ data, options }),
  });

  const route = new Route(Methods.GET, '/');

  const resource = new Resource(client, route);

  return resource.fetch().then(response => {
    expect(response.data).toEqual(data);

    expect(response.options).toEqual({
      path: 'host/',
      method: 'GET',
      body: undefined,
      params: undefined,
      headers: {},
    });
  });
});
