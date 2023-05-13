import { describe, expect, test } from '@jest/globals';
import sanitize from '../src/index';
import { NextFunction, Request, Response } from 'express';

describe('Sanitize middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
    };
  });

  test('No `password`', async () => {
    sanitize(['password'], false)(mockRequest as Request, mockResponse as Response, nextFunction);
    expect(nextFunction).toBeCalledTimes(1);
  });
});
