const nodePath = require('path')
// const nodePath = {} // handy when you wanna copy this into astexplorer.net

export default function(babel) {
  const {types: t, template} = babel
  const identifiers = new Set()
  const buildBuiltInWithConfig = template(`
    GLAMOROUS.BUILT_IN.withConfig({displayName: DISPLAY_NAME})
  `)
  const buildCustomWithConfig = template(`
    GLAMOROUS(ARGUMENTS).withConfig({displayName: DISPLAY_NAME})
  `)
  return {
    name: 'babel-plugin-glamorous-displayName',
    visitor: {
      ImportDeclaration(path) {
        const defaultSpecifierPath = path.get('specifiers')[0]
        if (
          path.node.source.value !== 'glamorous' ||
          !t.isImportDefaultSpecifier(defaultSpecifierPath)
        ) {
          return
        }
        const {node: {local: {name}}} = defaultSpecifierPath
        const {referencePaths} = path.scope.getBinding(name)
        referencePaths.forEach(reference => {
          identifiers.add(reference)
        })
      },
      VariableDeclarator(path) {
        const {node} = path
        if (!isRequireCall(node.init) || !t.isIdentifier(node.id)) {
          return
        }
        const {id: {name}} = node
        const binding = path.scope.getBinding(name)
        // I'm not sure whether this could ever happen
        // but I don't want a bug report hitting me because it did...
        // istanbul ignore else
        if (binding) {
          const {referencePaths} = binding
          referencePaths.forEach(reference => {
            identifiers.add(reference)
          })
        }
      },
      Program: {
        exit(path, {file}) {
          Array.from(identifiers).forEach(identifier => {
            const displayName = getDisplayName(identifier, file)

            handleBuiltIns(identifier, displayName)
            handleCustomComponent(identifier, displayName)
          })
        },
      },
    },
  }

  function handleBuiltIns(path, displayName) {
    const isBuiltIn = looksLike(path, {
      parentPath: {
        type: 'MemberExpression',
        node: {
          property: {
            type: 'Identifier',
          },
        },
        parent: {
          type: 'CallExpression',
        },
      },
    })
    if (!isBuiltIn) {
      return
    }
    path.parentPath.replaceWith(
      buildBuiltInWithConfig({
        GLAMOROUS: path.node,
        BUILT_IN: path.parent.property,
        DISPLAY_NAME: t.stringLiteral(displayName),
      }),
    )
  }

  function handleCustomComponent(path, displayName) {
    const isCustom = looksLike(path, {
      parent: {
        type: 'CallExpression',
      },
    })
    if (!isCustom) {
      return
    }
    path.parentPath.replaceWith(
      buildCustomWithConfig({
        GLAMOROUS: path.node,
        ARGUMENTS: path.parent.arguments,
        DISPLAY_NAME: t.stringLiteral(displayName),
      }),
    )
  }

  // credit: https://github.com/styled-components/babel-plugin-styled-components/blob/37a13e9c21c52148ce6e403100df54c0b1561a88/src/visitors/displayNameAndId.js
  function getDisplayName(path, file) {
    const componentName = getName(path)
    const filename = getFileName(file)
    if (filename) {
      if (filename === componentName) {
        return componentName
      }
      return componentName ? `${filename}__${componentName}` : filename
    } else {
      return componentName
    }
  }

  // credit: https://github.com/styled-components/babel-plugin-styled-components/blob/37a13e9c21c52148ce6e403100df54c0b1561a88/src/utils/getName.js
  function getName(path) {
    let namedNode

    path.find(parentPath => {
      if (parentPath.isObjectProperty()) {
        // const X = { Y: glamorous }
        namedNode = parentPath.node.key
      } else if (parentPath.isVariableDeclarator()) {
        // let X; X = glamorous
        namedNode = parentPath.node.id
      } else if (parentPath.isStatement()) {
        // we've hit a statement, we should stop crawling up
        return true
      }

      // we've got an displayName (if we need it) no need to continue
      if (namedNode) {
        return true
      }
      return false
    })

    // identifiers are the only thing we can reliably get a name from
    return t.isIdentifier(namedNode) ? namedNode.name : undefined
  }
}

function getFileName(file) {
  if (!file || file.opts.filename === 'unknown') {
    return ''
  }
  return file.opts.basename === 'index'
    ? nodePath.basename(nodePath.dirname(file.opts.filename))
    : file.opts.basename
}

function isRequireCall(callExpression) {
  return looksLike(callExpression, {
    type: 'CallExpression',
    callee: {
      name: 'require',
    },
    arguments: args =>
      args && args.length === 1 && args[0].value === 'glamorous',
  })
}

function looksLike(a, b) {
  return (
    a &&
    b &&
    Object.keys(b).every(bKey => {
      const bVal = b[bKey]
      const aVal = a[bKey]
      if (typeof bVal === 'function') {
        return bVal(aVal)
      }
      return isPrimitive(bVal) ? bVal === aVal : looksLike(aVal, bVal)
    })
  )
}

function isPrimitive(val) {
  // eslint-disable-next-line
  return val == null || /^[sbn]/.test(typeof val)
}
