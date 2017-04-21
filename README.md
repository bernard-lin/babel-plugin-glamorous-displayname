# babel-plugin-glamorous-displayname

This plugin adds a displayName property to your Glamorous components for use with React DevTools. 

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/bernard-lin/babel-plugin-glamorous-displayname/master/LICENSE)

## Example

**In**

```js
const MyStyledButton = glamorous.button();
```

![Alt text](https://cloud.githubusercontent.com/assets/16327281/25269334/2617d1c4-264a-11e7-98aa-9b67c9c26ad6.png "React DevTools")

**Out**

```js
const MyStyledButton = glamorous.button();
MyStyledButton.displayName = 'MyStyledButton'
```

![Alt text](https://cloud.githubusercontent.com/assets/16327281/25269284/f4c4791a-2649-11e7-8457-f367ea8fab59.png "React DevTools")

## Installation

```sh
$ npm install babel-plugin-glamorous-displayname
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["glamorous-displayname"]
}
```

### Via CLI

```sh
$ babel --plugins glamorous-displayname script.js
```

### Via Node API

```javascript
require('babel').transform('code', {
  plugins: ['glamorous-displayname']
});
```