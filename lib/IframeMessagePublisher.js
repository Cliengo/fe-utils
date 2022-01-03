class IframeMessagePublisher {
  constructor(sender) {
    this.sender = sender;
  }

  static postMessage(action, params = {}) {
    if (!IframeMessagePublisher.sender) {
      throw new Error('Sender instance has not been set');
    }

    const { sender: { senderId, target } } = IframeMessagePublisher.sender;

    const json = {
      sender: senderId,
      params,
      action,
    };

    window.parent.postMessage(
      json,
      target,
    );
  }

  static setInstance(senderId, target = '*') {
    if (!IframeMessagePublisher.sender) {
      IframeMessagePublisher.sender = new IframeMessagePublisher({ senderId, target });
    }
  }
}

module.exports = IframeMessagePublisher;