# fe-utils (Frontend utils)

Js library to share useful methods

## Installation

```bash
npm install git+https://github.com/Cliengo/fe-utils.git
```

**or**
```bash
yarn add git+https://github.com/Cliengo/fe-utils.git
```

## Usage

```javascript
import { method } from '@cliengo/fe-utils';

method();
```

## Available functionality
***
### `copyToClipboard`
Takes a value to send it to clipboard asynchronously and returns a boolean to indicates success or failure

```javascript
import { copyToClipboard } from '@cliengo/fe-utils';

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
import { isEmpty } from '@cliengo/fe-utils';

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
| Name     | Required | Type   | Default | Description                                 |
|----------|----------|--------|---------|---------------------------------------------|
| senderId | Yes      | string | N/A     | Indicates the name of the child application |
| target   | No       | string | '*'     | Indicates the URI of the parent             |


**`postMessage`**

Send messages to parent

params:
| Name   | Required | Type   | Default | Description                                                      |
|--------|----------|--------|---------|------------------------------------------------------------------|
| action | Yes      | string | N/A     | It's the key of the action which will be validated in the parent |
| params | No       | JSON   | {}      | Send additional data to the parent ex. IDs & flags               |



#### Usage
```javascript
import { IframeMessagePublisher } from '@cliengo/fe-utils';

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

## Contributing

1. Check out repo and create a branch
1. Do your thing
1. Bump version **following [SemVer](https://semver.org/)**
1. Transpile code with `yarn build`
1. Create a tag with the same name as the new version, **otherwise the new version won't be downloadable!** `git tag X.Y.Z`
1. Submit a PR

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.