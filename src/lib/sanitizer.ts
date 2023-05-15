import { Request, Response, NextFunction } from 'express';
import { checkCompatibility } from './helpers/version-checks';

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
    } else if (body[key] && typeof body[key] === 'object') {
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
      if (!body || typeof body !== 'object') {
        _json.call(this, body);
        return res;
      }

      const sanitizedBody = sanitizer(clone(body), sanitizeOn, positive);
      _json.call(this, sanitizedBody);
      return res;
    };
    next();
  };
}

/**
 * Clone a given object based on Node.js version.
 * (Prefer `structuredClone` if available.)
 * @param obj The object to clone
 * @returns The cloned object
 */
function clone(obj: object): object {
  if (checkCompatibility()) {
    return structuredClone(obj);
  } else {
    return JSON.parse(JSON.stringify(obj));
  }
}

export { sanitize, sanitizer };
