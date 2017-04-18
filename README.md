# babel-plugin-glamorous-displayname

Extended plugin sample for Babel.

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