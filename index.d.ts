declare module '@cliengo/fe-utils' {
  function copyToClipboard(value: string): boolean;
  function isEmpty(value: any): boolean;
  interface IAccount {
    name: string;
    planName: string;
    id: string;
    whiteLabelId?: string;
    vertical?: string;
    registerRole?: string;
    leadCount?: number;
    labs?: { [key: string]: boolean };
    language?: string;
    countryId?: string;
  }

  interface IUser {
    id: string;
    email?: string;
    privileges?: string;
  }

  interface IAnalyticsInitializeParams {
    segmentWriteKey: string;
    sendAnalytics: string;
    account: IAccount;
    user: IUser;
  }

  interface ITrackEventProps {
    eventName: string;
    category?: string;
    action?: string;
    label?: string;
  }

  class Analytics {
    constructor(sendAnalytics: string, initialized: string);

    public static initialize(params: IAnalyticsInitializeParams): void;
    public static trackEvent(eventProps: ITrackEventProps): void;
    public static trackPage(path: string, websiteId: string, url: string): void;
  }

  export {
    Analytics,
    copyToClipboard,
    isEmpty,
  }
}
