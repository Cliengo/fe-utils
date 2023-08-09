/**
 * Wrapper class around Segment API
 */
class Analytics {
  constructor(sendAnalytics = 'YES', initialized = false) {
    this.initialized = initialized;
    this.sendAnalytics = sendAnalytics;
    this.traits = window.analyticsTraits || {};
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
  static initialize({ segmentWriteKey, sendAnalytics, account, user } = {sendAnalytics: 'YES'}) {
    if (!!this.initialized || !!window.analyticsTraits)
      return console.warn('Instance already initialized');

    const analytics = window.analytics = window.analytics || [];
    analytics.invoked = !0;
    // eslint-disable-next-line max-len
    analytics.methods = ['trackSubmit', 'trackClick', 'trackLink', 'trackForm', 'pageview', 'identify', 'reset', 'group', 'track', 'ready', 'alias', 'debug', 'page', 'once', 'off', 'on'];
    analytics.factory = function (t) {
      return function () {
        // eslint-disable-next-line prefer-rest-params
        const argsArr = Array.prototype.slice.call(arguments);
        argsArr.unshift(t);
        analytics.push(argsArr);
        return analytics;
      };
    };

    // eslint-disable-next-line no-restricted-syntax
    for (const method of analytics.methods) {
      const e = analytics.methods[method];
      analytics[method] = analytics.factory(method);
    }

    analytics.load = function (key, e) {
      const newScript = document.createElement('script');
      newScript.type = 'text/javascript';
      newScript.async = !0;
      newScript.src = `https://cdn.segment.com/analytics.js/v1/${key}/analytics.min.js`;
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(newScript, firstScript);
      // eslint-disable-next-line no-underscore-dangle
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
  static identify(account, user) {
    if (this.sendAnalytics === 'NO') return;

    this.setTraits(account, user);

    if (window?.analytics?.identify) {
      return window.analytics.identify(this.traits.userId, this.traits);
    }

    return console.error('Unable to identify user. Segment was not initialized correctly');
  }
  /**
   * set Traits
   * @param user user operator information
   * @param account account company information
   */
  static setTraits(account, user) {
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
        country: account.countryId || 'Not Set',
      },
      category: '',
      label: '',
      filters: [],
    };
    window.analyticsTraits = this.traits;
    window.analyticsInAnonymousMode = Object.keys(user).length === 0;
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
  static trackEvent(eventProps = {}) {
    if (this.sendAnalytics === 'NO') return;

    const { eventName, ...props } = eventProps;
    if (window?.analytics?.track) {
      return window.analytics.track(eventName, { ...this.traits, eventName, ...props });
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
  static trackPage(path, websiteId, url) {
    if (this.sendAnalytics === 'NO') return;

    if (window?.analytics?.page) {
      const trackUrl = url ?? window.location.href;

      return window.analytics.page(path, {
        ...this.traits, path, name: path, url: trackUrl, websiteId,
      });
    }

    return console.error('Unable to trackPage. Segment was not initialized correctly');
  }
}

module.exports = Analytics;