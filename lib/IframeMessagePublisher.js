/**  
 * Its a Class which uses the singleton pattern to set a unique instance with an initial configuration
 * ready to be used across your application.
*/
class IframeMessagePublisher {
  /** Create a sender */
  constructor(sender) {
    this.sender = sender;
  }

  /** Send messages to parent 
   * @param {string} action - It's the key of the action which will be validated in the parent
   * @param {Object} [params={}] - Send additional data to the parent ex. IDs & flags
  */
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

  /** Initialize the instance with the configuration which will be used in the whole application
   * @param {string} senderId - Indicates the name of the child application
   * @param {string} [target='*'] - Indicates the URI of the parent
  */
  static setInstance(senderId, target = '*') {
    if (!IframeMessagePublisher.sender) {
      IframeMessagePublisher.sender = new IframeMessagePublisher({ senderId, target });
    }
  }
}

module.exports = IframeMessagePublisher;