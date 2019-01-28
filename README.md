<p align="center"><img src="https://coltorapps.com/images/r3shaper.png" width="260px"></p>
<p align="center">
✨ Isolate and normalize the API layer of your front-end app in an abstract way. ✨
</p>

## Motivation

If you've ever built JS front-end apps that consume 3rd party APIs, you've might noticed that sometimes it's
hard to work with data that's not structured in the "JS preferred way".

## Solution

**r3shaper** is a tiny tool that'll help you to organize and separate the API layer, normalize your requests and normalize
the responses. It provides an abstract _client_ that can be configured to work with _any_ request library.

## Installation

```shell
npm install r3shaper --save
```

## Example

---

### 1. Client

In order to start making requests, we have to instantiate a r3shaper client and configure it to use
our preferred request library. In the following example we'll use **Axios**:

```js
import axios from 'axios';
import { Client } from 'r3shaper';

const apiClient = new Client({
  basePath: 'https://reqres.in',
  headers: {
    'Content-Type': 'application/json',
  },
  apiProvider: ({ body, path, headers, method }, onError, onSuccess) =>
    axios({
      url: path,
      data: body,
      headers,
      method: String(method).toLowerCase(),
    })
      .then(({ data }) => onSuccess(data))
      .catch(onError),
});

export default apiClient;
```

> Note: you can instantiate as many clients as you'd like.

### 2. Resource

Now we can import our new client and define our first resource.

```js
import apiClient from './apiClient';

const UserResource = {
  /**
   * Get the list of users.
   */
  index: apiClient.get('/api/users', {
    onResponse: ({ data }) =>
      data.map(({ first_name, last_name, ...fields }) => ({
        ...fields,
        firstName: first_name,
        lastName: last_name,
      })),
  }),
  /**
   * Get a single user.
   */
  show: apiClient.get('/api/users/{id}', {
    onResponse: ({ first_name, last_name, ...fields }) => ({
      ...fields,
      firstName: first_name,
      lastName: last_name,
    }),
  }),
  /**
   * Store a new user.
   */
  store: apiClient.post('/api/users', {
    onRequest: ({ firstName, lastName, job }) => ({
      name: `${firstName} ${lastName}`,
      job,
    }),
  }),
  /**
   * Update a user.
   */
  update: apiClient.patch('/api/users/{id}', {
    onRequest: ({ firstName, lastName, job }) => ({
      name: `${firstName} ${lastName}`,
      job,
    }),
  }),
  /**
   * Delete a user.
   */
  destroy: apiClient.delete('/api/users/{id}'),
};
```

### 3. Resource Usage

```js
import UserResource from './UserResource';

UserResource.index().then(users => {
  /* ... */
});

UserResource.show({
  params: {
    id: 1,
  },
}).then(user => {
  /* ... */
});

UserResource.store({
  body: {
    firstName: 'John',
    lastName: 'Doe',
    job: 'Procrastinator',
  },
}).then(user => {
  /* ... */
});

UserResource.update({
  params: {
    id: 1,
  },
  body: {
    firstName: 'John',
    lastName: 'Doe',
    job: 'Procrastinator',
  },
}).then(user => {
  /* ... */
});

UserResource.delete({
  params: {
    id: 1,
  },
});
```

## Dependencies

None.

## Credits

Created by [Sergiu Masurceac](https://twitter.com/masurceac) and [Stratulat Alexandru](https://twitter.com/sandulat).

<a href="https://coltorapps.com/">
  <img src="https://coltorapps.com/images/logo_transparent.png" width="150px">
</a>
