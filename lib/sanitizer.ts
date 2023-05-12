import { Request, Response, NextFunction } from "express";

interface GenericObject {
    [key: string]: any
}

/**
 * Sanitize the given body using the `sanitizeOn` keys.
 * @param body The data object to sanitize
 * @param sanitizeOn The key or keys to sanitize the body on
 * @param positive The "direction" to sanitize. Positive will keep only the keys in `sanitizeOn`, negative will remove the keys in `sanitizeOn`
 * @returns The sanitized body object
 */
function sanitizer(body: GenericObject, sanitizeOn: string[] | string, positive: boolean = true) {
    if (!Array.isArray(sanitizeOn)) {
        sanitizeOn = [sanitizeOn];
    }

    const keys = Object.keys(body);
    const direction = positive ? (key: string) => !sanitizeOn.includes(key) : (key: string) => sanitizeOn.includes(key);

    keys.forEach((key) => {
        if (direction(key)) {
            delete body[key];
        } else if (body[key] && body[key].constructor === Object) {
            body[key] = sanitizer(body[key], sanitizeOn, positive);
        }
    });

    return body;
}

function sanitize(sanitizeOn: string[] | string, positive: boolean = true) {
    return (req: Request, res: Response, next: NextFunction) => {
        const _json = res.json;
        res.json = function (body: unknown): Response {
            if (!body || body.constructor !== Object) {
                _json.call(this, body);
                return res;
            };

            const sanitizedBody = sanitizer(body as GenericObject, sanitizeOn, positive);
            console.log(sanitizedBody);
            _json.call(this, sanitizedBody);
            return res;
        };
        next();
    };
}

export {
    sanitizer,
    sanitize,
}