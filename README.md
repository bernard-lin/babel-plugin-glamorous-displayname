<div align="center">
<h1>babel-plugin-glamorous-displayname</h1>

<p>add a displayName property to glamorous components</p>
</div>

<hr />

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package]
[![downloads][downloads-badge]][npmcharts]
[![MIT License][license-badge]][LICENSE]

[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome][prs-badge]][prs]
[![Code of Conduct][coc-badge]][coc]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

## The problem

You want to use glamorous, but you want to have a better experience with the
DevTools (because you lose the automatic `displayName` magic that the react
babel preset gives you).

## This solution

Adds the `displayName` to glamorous components.

**In**

```js
const MyStyledButton = glamorous.button();
```

![Alt text](https://cloud.githubusercontent.com/assets/16327281/25269334/2617d1c4-264a-11e7-98aa-9b67c9c26ad6.png "React DevTools")

**Out**

```js
const MyStyledButton = glamorous.button.withConfig({
  displayName: 'MyStyledButton'
});
```

![Alt text](https://cloud.githubusercontent.com/assets/16327281/25269284/f4c4791a-2649-11e7-8457-f367ea8fab59.png "React DevTools")

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `devDependencies`:

```
npm install --save-dev babel-plugin-glamorous-displayname
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

## Inspiration

- [styled-components](https://github.com/styled-components/babel-plugin-styled-components)

## Other Solutions

I'm not aware of any, if you are please [make a pull request][prs] and add it
here!

## Contributors

Thanks goes to these people ([emoji key][emojis]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars0.githubusercontent.com/u/16327281?v=4" width="100px;"/><br /><sub>Bernard Lin</sub>](https://github.com/bernard-lin)<br />[💻](https://github.com/bernard-lin/babel-plugin-glamorous-displayname/commits?author=bernard-lin "Code") [📖](https://github.com/bernard-lin/babel-plugin-glamorous-displayname/commits?author=bernard-lin "Documentation") [⚠️](https://github.com/bernard-lin/babel-plugin-glamorous-displayname/commits?author=bernard-lin "Tests") | [<img src="https://avatars0.githubusercontent.com/u/1500684?v=4" width="100px;"/><br /><sub>Kent C. Dodds</sub>](https://kentcdodds.com)<br />[🐛](https://github.com/bernard-lin/babel-plugin-glamorous-displayname/issues?q=author%3Akentcdodds "Bug reports") [💻](https://github.com/bernard-lin/babel-plugin-glamorous-displayname/commits?author=kentcdodds "Code") [📖](https://github.com/bernard-lin/babel-plugin-glamorous-displayname/commits?author=kentcdodds "Documentation") [🤔](#ideas-kentcdodds "Ideas, Planning, & Feedback") [🚇](#infra-kentcdodds "Infrastructure (Hosting, Build-Tools, etc)") [📢](#talk-kentcdodds "Talks") [⚠️](https://github.com/bernard-lin/babel-plugin-glamorous-displayname/commits?author=kentcdodds "Tests") |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][all-contributors] specification.
Contributions of any kind welcome!

## LICENSE

MIT

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[build-badge]: https://img.shields.io/travis/bernard-lin/babel-plugin-glamorous-displayname.svg?style=flat-square
[build]: https://travis-ci.org/bernard-lin/babel-plugin-glamorous-displayname
[coverage-badge]: https://img.shields.io/codecov/c/github/bernard-lin/babel-plugin-glamorous-displayname.svg?style=flat-square
[coverage]: https://codecov.io/github/bernard-lin/babel-plugin-glamorous-displayname
[version-badge]: https://img.shields.io/npm/v/babel-plugin-glamorous-displayname.svg?style=flat-square
[package]: https://www.npmjs.com/package/babel-plugin-glamorous-displayname
[downloads-badge]: https://img.shields.io/npm/dm/babel-plugin-glamorous-displayname.svg?style=flat-square
[npmcharts]: http://npmcharts.com/compare/babel-plugin-glamorous-displayname
[license-badge]: https://img.shields.io/npm/l/babel-plugin-glamorous-displayname.svg?style=flat-square
[license]: https://github.com/bernard-lin/babel-plugin-glamorous-displayname/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[donate-badge]: https://img.shields.io/badge/$-support-green.svg?style=flat-square
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/bernard-lin/babel-plugin-glamorous-displayname/blob/master/other/CODE_OF_CONDUCT.md
[github-watch-badge]: https://img.shields.io/github/watchers/bernard-lin/babel-plugin-glamorous-displayname.svg?style=social
[github-watch]: https://github.com/bernard-lin/babel-plugin-glamorous-displayname/watchers
[github-star-badge]: https://img.shields.io/github/stars/bernard-lin/babel-plugin-glamorous-displayname.svg?style=social
[github-star]: https://github.com/bernard-lin/babel-plugin-glamorous-displayname/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20babel-plugin-glamorous-displayname!%20https://github.com/bernard-lin/babel-plugin-glamorous-displayname%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/bernard-lin/babel-plugin-glamorous-displayname.svg?style=social
[emojis]: https://github.com/kentcdodds/all-contributors#emoji-key
[all-contributors]: https://github.com/kentcdodds/all-contributors
