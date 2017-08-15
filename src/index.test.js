import pluginTester from 'babel-plugin-tester'
import plugin from './'

pluginTester({
  plugin: plugin,
  snapshot: true,
  babelOptions: {filename: '/path/to/SomeComponent.js'},
  tests: {
    'does not affect non-named components': {
      code: `glamorous.button();`,
      snapshot: false,
    },
    'does not affect unused glamorous requires': {
      code: `const g = require('glamorous');`,
      snapshot: false,
    },
    'does not affect unused glamorous imports': {
      code: `
        import styled from 'styled-components';
        import glamorous from 'glamorous';
        glamorous.button();
        console.log(glamorous);
      `,
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
    'inserts the displayName to the bottom of the closure': `
      import g from 'glamorous'

      function foo() {
        const MyDiv = g.div()
        console.log(MyDiv)
        return MyDiv
        // foo
      }
    `,
    'handles scope in try': `
      import g from 'glamorous'

      function foo() {
        try {
          const MyDiv = g.div()
          console.log(MyDiv)
        } catch(e) {
          // foo
        }
        return MyDiv
      }
    `,
    'handles try as the last function body item': `
      import g from 'glamorous'

      function foo() {
        const MyDiv = g.div()
        try {
          console.log(MyDiv)
          return MyDiv
        } catch(e) {
          // foo
        }
      }
    `,
    'handles finally': `
      import g from 'glamorous'

      function foo() {
        const MyDiv = g.div()
        try {
          console.log(MyDiv)
          return MyDiv
        } finally {
          console.log('other thing')
        }
      }
    `,
    'does not insert "unknown" as part of the displayName': {
      babelOptions: {filename: 'unknown'},
      code: `
        import g from 'glamorous'
        const MySection = g.section()
      `,
    },
  },
})
