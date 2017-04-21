# babel-plugin-glamorous-displayname

This plugin adds a displayName property to your Glamorous components for use with React DevTools. 

## Example

**In**

```js
const MyStyledButton = glamorous.button();
```
React Dev Tools:
![Alt text](https://cloud.githubusercontent.com/assets/16327281/25269334/2617d1c4-264a-11e7-98aa-9b67c9c26ad6.png)

**Out**

```js
const MyStyledButton = glamorous.button();
MyStyledButton.displayName = 'MyStyledButton'
```

React Dev Tools:
![Alt text](https://cloud.githubusercontent.com/assets/16327281/25269284/f4c4791a-2649-11e7-8457-f367ea8fab59.png)

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