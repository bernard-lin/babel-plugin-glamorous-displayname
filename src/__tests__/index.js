import pluginTester from 'babel-plugin-tester'
import plugin from '../'

const simpleCode = `
  import g from 'glamorous'
  const MyDiv = g.div()
`

pluginTester({
  plugin,
  snapshot: true,
  babelOptions: {filename: '/path/to/SomeComponent.js'},
  tests: {
    'does not affect non-named components': {
      code: `glamorous.button();`,
      snapshot: false,
    },
    'does not affect non-glamorous imports': {
      code: `
        import styled from 'styled-components';
        style.div\`\`;
      `,
      snapshot: false,
    },
    'does not affect unused glamorous requires': {
      code: `const g = require('glamorous');`,
      snapshot: false,
    },
    'adds a display name for a component with a variable name': `
      import g from 'glamorous'
      const Button = g.button()
    `,
    'works with requires': `
      const l = require('glamorous')
      const MyDiv = l.div()
    `,
    'works with exported components': `
      import g from 'glamorous'
      export const MySection = g.section()
    `,
    'does not fail when destructuring built-in components': `
      import g from 'glamorous'
      const { Div } = g
    `,
    'handles style args': `
      import g from 'glamorous'
      const MySection = g.section({color: 'blue'}, () => ({}))
    `,
    'handles custom components': `
      import g from 'glamorous'
      const MyComp = g(MyThing, {rootEl: 'div'})()
    `,
    'does not insert "unknown" as part of the displayName': {
      babelOptions: {filename: 'unknown'},
      code: simpleCode,
    },
    'uses the parent directory if the filename is "index"': {
      babelOptions: {filename: '/foo/bar/component/index.js'},
      code: simpleCode,
    },
    'does not use the filename if it is the same as the component name': {
      babelOptions: {filename: '/foo/bar/MyDiv/index.js'},
      code: `
        import g from 'glamorous'
        const MyDiv = g.div()
      `,
    },
    'if component name cannot be inferred, it uses the filename only': {
      babelOptions: {filename: '/foo/bar/my-div.js'},
      code: `
        import g from 'glamorous'
        g.div()
      `,
    },
    'works in an object assignment': `
      import glamorous from 'glamorous'
      const comps = {
        Div: glamorous.div()
      }
    `,
    'works in member expressions': `
      import glamorous from 'glamorous'
      const comps = {}
      comps.Div = glamorous.div()
    `,
  },
})
