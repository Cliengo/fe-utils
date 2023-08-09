# fe-utils (Frontend utils)

Js library to share useful methods

## Installation

```bash
npm install cliengo-fe-utils
```

**or**
```bash
yarn add cliengo-fe-utils
```

## Usage

```javascript
import { method } from 'cliengo-fe-utils';

method();
```

## Available functionality
***
### `copyToClipboard`
Takes a value to send it to clipboard asynchronously and returns a boolean to indicates success or failure

```javascript
import { copyToClipboard } from 'cliengo-fe-utils';

async function myFunction() {
  const hasSuccess = copyToClipboard('Hello world');
  if (hasSuccess) {
    // ...do stuff
  }
}
```

***
### `isEmpty`
Takes a value and checks if it's any kind of empty

```javascript
import { isEmpty } from 'cliengo-fe-utils';

async function myFunction() {
  const value = isEmpty('Hello world');
  //value = false

  const value2 = isEmpty('');
  //value2 = true
}
```
***
### `IframeMessagePublisher`
Its a Class which uses the singleton pattern to set a unique instance with an initial configuration ready to be used across your application.

This was developed thinking on make the iframe communication with its parent much easier.

*methods*

**`setInstance`**

Initialize the instance with the configuration which will be used in the whole application

params:
<table>
<tr style="border-bottom: 1px solid">
  <td>Name</td>
  <td>Required</td>
  <td>Type</td>
  <td>Default</td>
  <td>Desciption</td>
</tr>
<tr>
  <td>senderId</td>
  <td>Yes</td>
  <td>string</td>
  <td>N/A</td>
  <td>Indicates the name of the child application</td>
</tr>
<tr>
  <td>target</td>
  <td>No</td>
  <td>string</td>
  <td>'*'</td>
  <td>Indicates the URI of the parent</td>
</tr>
</table>

**`postMessage`**

Send messages to parent

params:

<table>
<tr style="border-bottom: 1px solid">
  <td>Name</td>
  <td>Required</td>
  <td>Type</td>
  <td>Default</td>
  <td>Desciption</td>
</tr>
<tr>
  <td>action</td>
  <td>Yes</td>
  <td>string</td>
  <td>N/A</td>
  <td>It's the key of the action which will be validated in the parent</td>
</tr>
<tr>
  <td>params</td>
  <td>No</td>
  <td>JSON</td>
  <td>{}</td>
  <td>Send additional data to the parent ex. IDs & flags</td>
</tr>
</table>

#### Usage
```javascript
import { IframeMessagePublisher } from 'cliengo-fe-utils';

// Initialize the instance
IframeMessagePublisher.setInstance('my-project');

// Use where you need
IframeMessagePublisher.postMessage('do-stuff');
IframeMessagePublisher.postMessage('do-stuff-with-params', {
  refresh: true,
  id: 12345
});
```
***
### `Analytics`

*methods*

**`initialize`**

Initialize the analytics tracking

params: `Object{segmentWriteKey, sendAnalytics, account, user}`

properties:
<table>
<tr style="border-bottom: 1px solid">
  <td>Name</td>
  <td>Required</td>
  <td>Type</td>
  <td>Default</td>
  <td>Desciption</td>
</tr>
<tr>
  <td>sendWriteKey</td>
  <td>Yes</td>
  <td>string</td>
  <td>N/A</td>
  <td>key for tracking</td>
</tr>
<tr>
  <td>sendAnalytics</td>
  <td>No</td>
  <td>string</td>
  <td>'YES'</td>
  <td>flag to allow/disallow analytics tracking</td>
</tr>
<tr>
  <td>account</td>
  <td>Yes</td>
  <td>JSON</td>
  <td>N/A</td>
  <td>account(company) information</td>
</tr>
<tr>
  <td>user</td>
  <td>Yes</td>
  <td>JSON</td>
  <td>N/A</td>
  <td>user operator information</td>
</tr>
</table>


#### Usage
```javascript
import { Analytics } from 'cliengo-fe-utils';

// Initialize the instance
Analytics.initialize({
  segmentWriteKey: 'XXXXXXXXX',
  sendAnalytics: 'YES',
  account: JsonObject,
  user: JsonObject
});
```

**`trackEvent`**

Wrapper around the Segment's trackEvent method.
it is how you tell Segment about which actions your users are performing on your site.

params: `Object{
  eventName,
  category,
  action,
  ...moreProps
}`

properties:
<table>
<tr style="border-bottom: 1px solid">
  <td>Name</td>
  <td>Required</td>
  <td>Type</td>
  <td>Default</td>
  <td>Desciption</td>
</tr>
<tr>
  <td>eventName</td>
  <td>Yes</td>
  <td>string</td>
  <td>N/A</td>
  <td>Name of the event</td>
</tr>
<tr>
  <td>category</td>
  <td>No</td>
  <td>string</td>
  <td>N/A</td>
  <td>category of the event</td>
</tr>
<tr>
  <td>action</td>
  <td>No</td>
  <td>string</td>
  <td>N/A</td>
  <td>usually matches with eventName</td>
</tr>
<tr>
  <td>label</td>
  <td>No</td>
  <td>string</td>
  <td>N/A</td>
  <td>optional value</td>
</tr>
</table>

**rest of the properties depends on the case**
#### Usage
```javascript
import { Analytics } from 'cliengo-fe-utils';

Analytics.trackEvent({
  eventName: 'user_registration',
  category: 'register',
  action: 'user_registration'
});
```

**`trackPage`**

Wrapper around method Segment's page method.
it lets you record page views on your website, along with optional information about the page being viewed.

params:
<table>
<tr style="border-bottom: 1px solid">
  <td>Name</td>
  <td>Required</td>
  <td>Type</td>
  <td>Default</td>
  <td>Desciption</td>
</tr>
<tr>
  <td>path</td>
  <td>Yes</td>
  <td>string</td>
  <td>N/A</td>
  <td>path of the page</td>
</tr>
<tr>
  <td>websiteId</td>
  <td>No</td>
  <td>string</td>
  <td>" " or undefined</td>
  <td>id of selected website</td>
</tr>
<tr>
  <td>url</td>
  <td>No</td>
  <td>string</td>
  <td>window.location.href</td>
  <td>url of current page</td>
</tr>
</table>

**rest of the properties depends on the case**
#### Usage
```javascript
import { Analytics } from 'cliengo-fe-utils';

Analytics.trackPage('/live/visitors');
```

**`setTraits`**

Lets you set the information about the current user and account.

params:
<table>
<tr style="border-bottom: 1px solid">
  <td>Name</td>
  <td>Required</td>
  <td>Type</td>
  <td>Default</td>
  <td>Desciption</td>
</tr>
<tr>
  <td>account</td>
  <td>Yes</td>
  <td>JSON</td>
  <td>N/A</td>
  <td>account(company) information</td>
</tr>
<tr>
  <td>user</td>
  <td>Yes</td>
  <td>JSON</td>
  <td>N/A</td>
  <td>user operator information</td>
</tr>
</table>

#### Usage
```javascript
import { Analytics } from 'cliengo-fe-utils';

Analytics.setTraits(account, user);
```

**Some flags:**
This utils set some flags at `window.analytics` level.

- initialized
- analyticsInAnonymousMode
***

## Contributing

1. Check out repo and create a branch
1. Do your thing
1. Bump version **following [SemVer](https://semver.org/)**
1. Transpile code with `yarn build`
1. Create a tag with the same name as the new version, **otherwise the new version won't be downloadable!** `git tag X.Y.Z`
1. Submit a PR

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.