/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test } from '@jest/globals';
import { sanitizer } from '../src/lib/sanitizer';
import { testUserA, testUserB, testUserC, testUserD, userArr } from './test-objects';

describe('Sanitizer', () => {
  const sanitizeOn: string[] = ['username', 'blahblah'];
  
  test('Sanitizer keeps only the username and blahblah keys', () => {
    const expectedObj = { ...testUserA } as any;
    delete expectedObj.password;
    
    expect(sanitizer(structuredClone(testUserA), sanitizeOn, true)).toEqual(expectedObj);
    expect(testUserA).toEqual(testUserA);
  });

  test('Should not remove a non-existent key', () => {
    expect(sanitizer(structuredClone(testUserA), 'nonexistentkey')).toEqual(testUserA);
    expect(testUserA).toEqual(testUserA);
  });
  
  test('Sanitizer removes the username and blahblah keys', () => {
    const expectedObj = { ...testUserA } as any;
    delete expectedObj.username;
    delete expectedObj.blahblah;
    
    expect(sanitizer(structuredClone(testUserA), sanitizeOn, false)).toEqual(expectedObj);
    expect(testUserA).toEqual(testUserA);
  });
  
  test('Sanitizer removes the password key', () => {
    const expectedObj = { ...testUserA } as any;
    delete expectedObj.password;
    
    expect(sanitizer(structuredClone(testUserA), 'password')).toEqual(expectedObj);
    expect(testUserA).toEqual(testUserA);
  });
  
  test('Should remove the password key from parent and all children objects', () => {
    const expectedObj = {
      ...testUserC
    } as any;
    delete expectedObj.password;
    delete expectedObj.friends.password;
    const result = sanitizer(structuredClone(testUserC), 'password');
    
    expect(result).toEqual(expectedObj);
    expect(testUserC).toEqual(testUserC);
  });
  
  test('Should remove the password key from every member of array prop', () => {
    const expectedObj = { ...testUserD };
    delete expectedObj.password;
    if (Array.isArray(expectedObj.friends)) {
      expectedObj.friends.forEach((friend) => {
        delete friend.password;
      });
    }
    
    const result = sanitizer(structuredClone(testUserD), 'password');
    expect(result).toEqual(expectedObj);
    expect(testUserD).toEqual(testUserD);
  });
  
  test('Should remove the password key from all array object elements', () => {
    const expectedArr = [
      {
        username: 'Peter Parker',
        blahblah: false
      },
      {
        username: 'Miles Morales',
        blahblah: true
      },
    ];
    
    const result = sanitizer(structuredClone(userArr), 'password');

    expect(result).toEqual(expectedArr);
    expect(userArr).toEqual(userArr);
  });
});
