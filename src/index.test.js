import pluginTester from 'babel-plugin-tester'
import plugin from './'

pluginTester({
  plugin: plugin,
  snapshot: true,
  tests: [
    {code: `glamorous.button();`, snapshot: false},
    {code: `const g = require('glamorous');`, snapshot: false},
    {
      code: `
        import styled from 'styled-components';
        import glamorous from 'glamorous';
        glamorous.button();
        console.log(glamorous);
      `,
      snapshot: false,
    },
    `
      import g from 'glamorous'
      const Button = g.button()
    `,
    `
      const l = require('glamorous')
      const MyDiv = l.div()
    `,
    `
      import g from 'glamorous'
      export const MySection = g.section()
    `,
  ],
})
