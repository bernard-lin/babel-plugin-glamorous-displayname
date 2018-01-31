import path from 'path'
import pluginTester from 'babel-plugin-tester'
import plugin from 'babel-plugin-macros'

// removes annoying quotes around string-only stuff
expect.addSnapshotSerializer({
  print(val) {
    return val
  },
  test(val) {
    return typeof val === 'string'
  },
})

pluginTester({
  plugin,
  snapshot: true,
  babelOptions: {filename: path.join(__dirname, 'SomeComponent.js')},
  tests: [
    {
      title: 'simple use case',
      code: `
        import glamorous from '../macro'

        const MyComp = glamorous.div()
      `,
    },
    {
      title: 'multiple usages',
      code: `
        import glamorous from '../macro'

        const MyComp = glamorous.div()
        const MyOtherComp = glamorous.span()
      `,
    },
    {
      title: 'different name',
      code: `
        import g from '../macro'

        const MyComp = g.div()
        const MyOtherComp = g.span()
      `,
    },
  ],
})
