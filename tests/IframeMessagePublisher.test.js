const IframeMessagePublisher = require('../lib/IframeMessagePublisher');

const mockPostMessage = jest.fn();

const message = {
  action: 'hey',
  params: {},
  sender: 'frontend-utils'
};

const messageWithParams = {
  action: 'hey-params',
  params: {
    id: 12345,
    refresh: true
  },
  sender: 'frontend-utils'
};


Object.defineProperty(window.parent, 'postMessage', {
  value: mockPostMessage
});

describe('Iframe Message Publisher', () => {
  IframeMessagePublisher.setInstance('frontend-utils');

  it('Should send a proper message', () => {
    IframeMessagePublisher.postMessage('hey');
    expect(mockPostMessage).toHaveBeenCalledWith(message, '*');
  });

  it('Should send a proper message with params', () => {
    IframeMessagePublisher.postMessage('hey-params', { id: 12345, refresh: true});
    expect(mockPostMessage).toHaveBeenCalledWith(messageWithParams, '*');
  });
});