const copyToClipboard = require('../lib/copyToClipboard');

describe('Copy To Clipboard', () => {
  it('Shoud get a successfull response', async () => {
    Object.defineProperty(global.navigator, 'clipboard', {
      value: {
        writeText: jest.fn().mockImplementationOnce(() => Promise.resolve('ok'))
      },
      configurable: true
    });

    const hasSuccess = await copyToClipboard('Hello!!');
    expect(hasSuccess).toBeTruthy();
  });

  it('Shoud get a failure response', async () => {
    Object.defineProperty(global.navigator, 'clipboard', {
      value: {
        writeText: jest.fn().mockImplementationOnce(() => Promise.reject('fail'))
      },
      configurable: true
    });
    global.console = { error: jest.fn()};

    const hasSuccess = await copyToClipboard('Hello!!');
    expect(hasSuccess).toBeFalsy();
    expect(console.error).toBeCalled();
  });
});