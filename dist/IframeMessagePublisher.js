"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/**  
 * Its a Class which uses the singleton pattern to set a unique instance with an initial configuration
 * ready to be used across your application.
*/
var IframeMessagePublisher = /*#__PURE__*/function () {
  /** Create a sender */
  function IframeMessagePublisher(sender) {
    (0, _classCallCheck2["default"])(this, IframeMessagePublisher);
    this.sender = sender;
  }
  /** Send messages to parent 
   * @param {string} action - It's the key of the action which will be validated in the parent
   * @param {Object} [params={}] - Send additional data to the parent ex. IDs & flags
  */


  (0, _createClass2["default"])(IframeMessagePublisher, null, [{
    key: "postMessage",
    value: function postMessage(action) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!IframeMessagePublisher.sender) {
        throw new Error('Sender instance has not been set');
      }

      var _IframeMessagePublish = IframeMessagePublisher.sender.sender,
          senderId = _IframeMessagePublish.senderId,
          target = _IframeMessagePublish.target;
      var json = {
        sender: senderId,
        params: params,
        action: action
      };
      window.parent.postMessage(json, target);
    }
    /** Initialize the instance with the configuration which will be used in the whole application
     * @param {string} senderId - Indicates the name of the child application
     * @param {string} [target='*'] - Indicates the URI of the parent
    */

  }, {
    key: "setInstance",
    value: function setInstance(senderId) {
      var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '*';

      if (!IframeMessagePublisher.sender) {
        IframeMessagePublisher.sender = new IframeMessagePublisher({
          senderId: senderId,
          target: target
        });
      }
    }
  }]);
  return IframeMessagePublisher;
}();

module.exports = IframeMessagePublisher;