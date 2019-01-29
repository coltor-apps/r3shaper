import { Route } from '../Route';
import { Methods } from '../enums/methods.enum';

test('Test route initialization', () => {
  const method = Methods.GET;

  const path = '/';

  const route = new Route(method, path);

  expect(route.method).toBe(method);
  expect(route.path).toBe(path);
});
