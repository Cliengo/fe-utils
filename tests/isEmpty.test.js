const { isEmpty } = require('../lib');

describe('Is Empty', () => {
  it('Should get a Truthy values', () => {
    expect(isEmpty(null)).toBeTruthy();
    expect(isEmpty(undefined)).toBeTruthy();
    expect(isEmpty('')).toBeTruthy();
    expect(isEmpty({})).toBeTruthy();
    expect(isEmpty([])).toBeTruthy();
  });

  it('Should get a Falsy values', () => {
    expect(isEmpty('Hello')).toBeFalsy();
    expect(isEmpty({name: 'Jorge'})).toBeFalsy();
    expect(isEmpty([1,2,3])).toBeFalsy();
  });
});