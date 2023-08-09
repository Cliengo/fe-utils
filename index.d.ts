declare module 'cliengo-fe-utils' {
  function copyToClipboard(value: string): boolean;
  function isEmpty(value: any): boolean;

  export type JsonValue = string | number | boolean | JsonObject | JsonArray | undefined;

  export type JsonObject = {
    [key: string]: JsonValue;
  };
  
  export type JsonArray = Array<JsonValue>;

  interface IAnalyticsInitializeParams {
    segmentWriteKey: string;
    sendAnalytics: string;
    account: JsonObject;
    user: JsonObject;
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
    public static setTraits(account: JsonObject, user: JsonObject);
  }

  export {
    Analytics,
    copyToClipboard,
    isEmpty,
  }
}
