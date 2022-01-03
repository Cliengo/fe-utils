"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var IframeMessagePublisher = /*#__PURE__*/function () {
  function IframeMessagePublisher(sender) {
    (0, _classCallCheck2["default"])(this, IframeMessagePublisher);
    this.sender = sender;
  }

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