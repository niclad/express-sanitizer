import { Request, Response, NextFunction } from 'express';

interface GenObj {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/**
 * Sanitize the given body using the `sanitizeOn` keys.
 * @param body The data object to sanitize
 * @param sanitizeOn The key or keys to sanitize the body on
 * @param positive The "direction" to sanitize. Positive will keep only the keys in `sanitizeOn`, negative will remove the keys in `sanitizeOn`
 * @returns The sanitized body object
 */
function sanitizer(body: GenObj, sanitizeOn: string[] | string, positive = false) {
  if (!Array.isArray(sanitizeOn)) {
    sanitizeOn = [sanitizeOn];
  }

  const keys = Object.keys(body);
  const direction = positive ? (key: string) => !sanitizeOn.includes(key) : (key: string) => sanitizeOn.includes(key);

  keys.forEach((key) => {
    if (direction(key)) {
      delete body[key];
    } else if (body[key] && body[key]?.constructor === Object) {
      body[key] = sanitizer(body[key], sanitizeOn, positive);
    }
  });

  return body;
}

/**
 * Sanitize the response body using the given keys.
 * @param sanitizeOn List of keys to sanitize from the response body
 * @param positive The direction to sanitize on.
 * `positize === true` will keep only the keys in `sanitizeOn`,
 * `positive === false` will remove the keys in `sanitizeOn`
 * @returns Middleware function to sanitize the response body
 */
function sanitize(sanitizeOn: string[] | string, positive = false) {
  return (req: Request, res: Response, next: NextFunction) => {
    const _json = res.json;
    res.json = function (body: unknown): Response {
      if (!body || body.constructor !== Object) {
        _json.call(this, body);
        return res;
      }

      const sanitizedBody = sanitizer(body, sanitizeOn, positive);
      console.log(sanitizedBody);
      _json.call(this, sanitizedBody);
      return res;
    };
    next();
  };
}

export { sanitizer, sanitize };
