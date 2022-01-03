"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var IframeMessagePublisher = /*#__PURE__*/function () {
  function IframeMessagePublisher(sender) {
    _classCallCheck(this, IframeMessagePublisher);

    this.sender = sender;
  }

  _createClass(IframeMessagePublisher, null, [{
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