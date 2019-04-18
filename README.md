<p align="center"><img src="https://coltorapps.com/images/r3shaper.png" width="260px"></p>
<p align="center">
✨ Isolate and normalize the API layer of your app. ✨
</p>

<p align="center">
<img src="https://travis-ci.org/coltor-apps/r3shaper.svg?branch=master">
<img src="https://badge.fury.io/js/r3shaper.svg">
<img src="https://img.shields.io/github/license/coltor-apps/r3shaper.svg">
<a href="https://twitter.com/home?status=https%3A//github.com/coltor-apps/r3shaper">
  <img src="https://img.shields.io/twitter/url/https/github.com/coltor-apps/r3shaper.svg?style=social">
</a>
</p>

## Motivation

Keeping the API layer isolated and organized can be a real pain. 😩

Where can I ergonomically normalize my requests and responses? What if tomorrow I can't or don't want to use the same request library I've used before? How can I reuse my API layer on another JS platform without depending on a request library? Are my requests isolated and testable? Can I intercept and debug all of my requests and responses?

## Solution

**r3shaper** is a tiny tool that'll help you organize and isolate your API layer, as well as normalize your requests and responses. It provides an abstract _client_ that can be configured to work with _any_ request library. Effortlessly reuse your API resources on other JS platforms.

## Installation

```shell
npm install r3shaper --save
```

## Client Initialization

The client receives a configuration object with 3 options:

| Option      | Type                                                                                                                 | Description                                |
|-------------|----------------------------------------------------------------------------------------------------------------------|--------------------------------------------|
| basePath (optional)    | `string`                                                                                                  | API basepath.                               |
| headers (optional)     | `object`                                                                                                  | API headers.                                |
| apiProvider | `function({ body?, path, method, headers?, params?, meta? }, onError, onSuccess)` | Wrapper function around the request library. |

In order to start making requests, we have to initialize a r3shaper client and configure it to use our preferred request library. In the following example we'll use **Axios**:

```js
import axios from 'axios';
import { Client } from 'r3shaper';

const apiClient = new Client({
  basePath: 'https://reqres.in',
  headers: {
    'Content-Type': 'application/json',
  },
  apiProvider: ({ body, path, headers, method, meta = {} }, onError, onSuccess) =>
    axios({
      url: path,
      data: body,
      headers,
      method,
    })
      .then(({ data }) => {
        if (meta.notification) {
          alert(meta.notification);
        }

        onSuccess(data);
      })
      .catch(onError),
});

export default apiClient;
```

> Note: you can instantiate as many clients as you'd like.

### Resources

Once we've initialized a client, it exposes us a list of 8 methods for resources creation.

- ```apiClient.get()```

- ```apiClient.head()```

- ```apiClient.post()```

- ```apiClient.put()```

- ```apiClient.delete()```

- ```apiClient.connect()```

- ```apiClient.options()```

- ```apiClient.trace()```

- ```apiClient.patch()```

Each of these methods receive 2 parameters:

| Parameter    | Type                                                                                                                             | Description                                           |
|--------------|----------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------|
| path         | `string`                                                                                                                         | API endpoint. Use brackets for parameters: `/user/{id}`.                                          |
| interceptors (optional) | `{ onRequest?, onResponse? }`  | An object with request and response normalizing functions. |

Now we can import our new client and define our resources.

```js
import apiClient from './apiClient';

const UserResource = {
  /**
   * Get the list of users.
   */
  index: apiClient.get('/api/users', {
    // Normalize the response
    onResponse: (data, meta) =>
      data.map(({ first_name, last_name }) => ({
        firstName: first_name,
        lastName: last_name,
      })),
  }),
  /**
   * Get a single user.
   */
  show: apiClient.get('/api/users/{id}', {
    // Normalize the response
    onResponse: ({ first_name, last_name }, meta) => ({
      firstName: first_name,
      lastName: last_name,
    }),
  }),
  /**
   * Store a new user.
   */
  store: apiClient.post('/api/users', {
    // Normalize the request
    onRequest: ({ firstName, lastName, job }, meta) => ({
      full_name: `${firstName} ${lastName}`,
      job,
    }),
  }),
  /**
   * Update a user.
   */
  update: apiClient.patch('/api/users/{id}', {
    // Normalize the request
    onRequest: ({ firstName, lastName, job }, meta) => ({
      full_name: `${firstName} ${lastName}`,
      job,
    }),
  }),
  /**
   * Delete a user.
   */
  destroy: apiClient.delete('/api/users/{id}'),
};
```

## Resource Usage

Resources return a `Promise` and receive a configuration object with 4 options:

| Option                 | Type     | Description                                              |
|------------------------|----------|----------------------------------------------------------|
| body (optional)        | `object` | Request body that will go through `onRequest` normalizer. |
| params (optional)      | `object` | Route params that will be replaced in the URL.            |
| queryParams (optional) | `object` | Request URL query params.                                 |
| headers (optional)     | `object` | Request headers.                                         |
| meta (optional)        | `object` | Additional data (anything you'd like to use later).      |

The returned result by this `Promise` is the API response that went through `onResponse` normalizer.

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
  meta: {
    notification: 'User has been created',
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
  meta: {
    notification: 'User 1 has been updated',
  },
}).then(user => {
  /* ... */
});

UserResource.delete({
  params: {
    id: 1,
  },
  meta: {
    notification: 'User 1 has been deleted',
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
