"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _excluded = ["eventName"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Wrapper class around Segment API
 */
var Analytics = /*#__PURE__*/function () {
  function Analytics() {
    var sendAnalytics = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'YES';
    var initialized = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    (0, _classCallCheck2["default"])(this, Analytics);
    this.initialized = initialized;
    this.sendAnalytics = sendAnalytics;
    this.traits = {};
  }
  /**
   * Initialize the analytics tracking
   * @param {Object} properties - analytic's properties
   * @param {string} properties.segmentWriteKey - key for tracking
   * @param {string} [properties.sendAnalytics='YES'] - flag to allow/disallow analytics tracking
   * @param {Object} properties.account - account company information
   * @param {Object} properties.user - user operator information
   * @returns {void}
   */


  (0, _createClass2["default"])(Analytics, null, [{
    key: "initialize",
    value: function initialize() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        sendAnalytics: 'YES'
      },
          segmentWriteKey = _ref.segmentWriteKey,
          sendAnalytics = _ref.sendAnalytics,
          account = _ref.account,
          user = _ref.user;

      if (!!this.initialized) return console.warn('Instance already initialized');
      var analytics = window.analytics = window.analytics || [];
      analytics.invoked = !0; // eslint-disable-next-line max-len

      analytics.methods = ['trackSubmit', 'trackClick', 'trackLink', 'trackForm', 'pageview', 'identify', 'reset', 'group', 'track', 'ready', 'alias', 'debug', 'page', 'once', 'off', 'on'];

      analytics.factory = function (t) {
        return function () {
          // eslint-disable-next-line prefer-rest-params
          var argsArr = Array.prototype.slice.call(arguments);
          argsArr.unshift(t);
          analytics.push(argsArr);
          return analytics;
        };
      }; // eslint-disable-next-line no-restricted-syntax


      var _iterator = _createForOfIteratorHelper(analytics.methods),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var method = _step.value;
          var e = analytics.methods[method];
          analytics[method] = analytics.factory(method);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      analytics.load = function (key, e) {
        var newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        newScript.async = !0;
        newScript.src = "https://cdn.segment.com/analytics.js/v1/".concat(key, "/analytics.min.js");
        var firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(newScript, firstScript); // eslint-disable-next-line no-underscore-dangle

        analytics._loadOptions = e;
      };

      analytics.SNIPPET_VERSION = '4.1.0';
      analytics.load(segmentWriteKey);
      this.sendAnalytics = sendAnalytics;
      this.identify(account, user);
      this.initialized = true;
    }
    /**
    * Wrapper around the Segment's identify method.
    * it is how to tell Segment who the current user is.
    * @param {*} user
    * @param {*} account
    */

  }, {
    key: "identify",
    value: function identify(account, user) {
      var _window, _window$analytics;

      if (this.sendAnalytics === 'NO') return;
      this.setTraits(account, user);

      if ((_window = window) !== null && _window !== void 0 && (_window$analytics = _window.analytics) !== null && _window$analytics !== void 0 && _window$analytics.identify) {
        return window.analytics.identify(this.traits.userId, this.traits);
      }

      return console.error('Unable to identify user. Segment was not initialized correctly');
    }
    /**
     * set Traits
     * @param user user operator information
     * @param account account company information
     */

  }, {
    key: "setTraits",
    value: function setTraits(account, user) {
      this.traits = {
        userId: user.id,
        userEmail: user.email || 'Not Set',

        /**
         * `companyName` is duplicated for data purposes.
         * Hotjar integration with segment is not able to read data inside an object
         * therefore, the "account" object listed below is not useful.
         */
        companyName: account.name || 'Not Set',

        /**
         * `companyPlan` is duplicated for data purposes.
         * Hotjar integration with segment is not able to read data inside an object
         * therefore, the "account" object listed below is not useful.
         */
        companyPlan: account.planName || 'Not Set',

        /**
         * `companyId` is duplicated for data purposes.
         * Hotjar integration with segment is not able to read data inside an object
         * therefore, the "account" object listed below is not useful.
         */
        companyId: account.id,
        whitelabelId: account.whiteLabelId || 'Not Set',
        vertical: account.vertical || 'Not Set',
        account: {
          companyId: account.id,
          companyName: account.name || 'Not Set',
          planName: account.planName || 'Not Set',
          whitelabelId: account.whiteLabelId || 'Not Set',
          vertical: account.vertical || 'Not Set',
          companyRole: account.registerRole || 'Not Set',
          userPrivileges: user.privileges || 'Not Set',
          leadCount30Days: account.leadCount || 'Not Set',
          labs: account.labs || 'Not Set',
          uiVersion: 'UI v2',
          language: account.language || 'Not Set',
          country: account.countryId || 'Not Set'
        },
        category: 'live',
        label: 'new_live',
        filters: []
      };
    }
    /**
     * Wrapper around the Segment's trackEvent method.
     * it is how you tell Segment about which actions your users are performing on your site.
     * @param {Object} eventProps - event's properties
     * @param {string} eventProps.eventName - name of the event.
     * @param {string} [eventProps.category=''] - category. Default value `''`
     * @param {string} [eventProps.action=''] - action. Default value `''`
     * @param {string} [eventProps.label=''] - label. Default value `''`
     * @param {string[]} [eventProps.filters=[]] - filters. Default value `[]`
     * @returns {void}
     */

  }, {
    key: "trackEvent",
    value: function trackEvent() {
      var _window2, _window2$analytics;

      var eventProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (this.sendAnalytics === 'NO') return;
      var eventName = eventProps.eventName,
          props = (0, _objectWithoutProperties2["default"])(eventProps, _excluded);

      if ((_window2 = window) !== null && _window2 !== void 0 && (_window2$analytics = _window2.analytics) !== null && _window2$analytics !== void 0 && _window2$analytics.track) {
        return window.analytics.track(eventName, _objectSpread(_objectSpread({}, this.traits), {}, {
          eventName: eventName
        }, props));
      }

      return console.error('Unable to trackEvent. Segment was not initialized correctly');
    }
    /**
     * Wrapper around method Segment's page method.
     * it lets you record page views on your website, along with optional information about the page being viewed.
     * @param {*} path
     * @param {*} websiteId
     * @param {*} url
     */

  }, {
    key: "trackPage",
    value: function trackPage(path, websiteId, url) {
      var _window3, _window3$analytics;

      if (this.sendAnalytics === 'NO') return;

      if ((_window3 = window) !== null && _window3 !== void 0 && (_window3$analytics = _window3.analytics) !== null && _window3$analytics !== void 0 && _window3$analytics.page) {
        var trackUrl = url !== null && url !== void 0 ? url : window.location.href;
        return window.analytics.page(path, _objectSpread(_objectSpread({}, this.traits), {}, {
          path: path,
          name: path,
          url: trackUrl,
          websiteId: websiteId
        }));
      }

      return console.error('Unable to trackPage. Segment was not initialized correctly');
    }
  }]);
  return Analytics;
}();

module.exports = Analytics;