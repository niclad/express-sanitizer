import { describe, expect, test } from "@jest/globals";
import { sanitizer } from "../lib/sanitizer";
import { testA } from "./test-objects";

describe("Sanitizer", () => {
    const sanitizeOn: string[] = ['username', 'blahblah'];

    test("Sanitizer keeps only the `username` and `blahblah` keys", () => {
        const expectedObj = {...testA} as any;
        delete expectedObj.password;

        expect(sanitizer(testA, sanitizeOn)).toEqual(expectedObj);
    });

    test("Sanitizer removes the `username` and `blahblah` keys", () => {
        const expectedObj = {...testA} as any;
        delete expectedObj.username;
        delete expectedObj.blahblah;

        expect(sanitizer(testA, sanitizeOn, false)).toEqual(expectedObj);
    });

    test("Sanitizer removes the `password` key", () => {
        const expectedObj = {...testA} as any;
        delete expectedObj.password;

        expect(sanitizer(testA, 'password')).toEqual(expectedObj);
    });
});
