# Express sanitizer middleware
Express middleware to sanitize JSON responses.

⚠️ This will only sanitize responses when sent using `res.json(...)` in Express.

# Install
Install using
```
npm install sanitware
```

# Usage
Using this is middleware is as simple as using it at the level desired.

It is used like any other Express middleware. More info can be found [on the Express site](https://expressjs.com/en/guide/using-middleware.html).

It's recommended to use this at the finest level possible, i.e. only on the routes needed.

### `sanitize(sanitizeOn: string[] | string, positive: boolean = false)`
This will remove any properties defined by `sanitizeOn` from the response body object sent with [`res.json`](https://expressjs.com/en/4x/api.html#res.json).

#### `sanitizeOn`
Prop keys to clean (or keep) from the response object.

#### `positive`
The "direction" to sanitize. Positive sanitization will __*keep*__ the given keys in the response body object. Negative sanitization will do the opposite, __*removing*__ the given keys.

**`false`** (default): negative sanitization  
**`true`**: positive sanitization. `sanitize([], true)` will return `{}`.

# Example
This is an example of how to use this on the route-level of an Express app.

## TypeScript
```ts
import { Router } from 'express';
import { sanitize } from 'sanitware';
// ...

const myCoolRoutes = Router();
const removeKeys: string[] = [
    'password',
    'PII',
    // etc...?
];
myCoolRoutes.use(sanitizer(removeKeys));
// ...

// routes, exports, etc...
```

## JavaScript
```js
const Router = require('express').Router;
const sanitize = require('sanitware');

const myCoolRoutes = Router();
const removeKeys = [
    'password',
    'PII',
    // etc...?
];
myCoolRoutes.use(sanitizer(removeKeys));
// ...

// routes, exports, etc...
```
