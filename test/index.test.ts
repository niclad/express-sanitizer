import { describe, expect, test } from "@jest/globals";
import sanitize from "../index";
import { NextFunction, Request, Response } from "express";
import { testA } from "./test-objects";

describe("Sanitize middleware", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: NextFunction = jest.fn();


    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn(),
        };
    });

    test("No `password`", async () => {
        const expectedBody = {
            username: 'Peter Parker',
            blahblah: false
        };

        sanitize(['password'], false)(mockRequest as Request, mockResponse as Response, nextFunction);
        expect(nextFunction).toBeCalledTimes(1);
    });
});
