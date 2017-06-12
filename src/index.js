export default function(babel) {
  const {types: t} = babel
  const identifiers = new Set()
  const declarators = new Set()
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
        if (binding) {
          const {referencePaths} = binding
          referencePaths.forEach(reference => {
            identifiers.add(reference)
          })
        }
      },
      Program: {
        exit(path) {
          Array.from(identifiers).forEach(identifier => {
            let declarator = identifier.findParent(t.isVariableDeclarator)
            if (!declarator || declarators.has(declarator)) {
              return
            }
            declarators.add(declarator)
            const {node: {id: {name: displayName}}} = declarator

            if (declarator.parentPath.findParent(t.isExportNamedDeclaration)) {
               declarator = declarator.parentPath
            }

            declarator.parentPath.insertAfter(
              t.expressionStatement(
                t.assignmentExpression(
                  '=',
                  t.memberExpression(
                    t.identifier(displayName),
                    t.identifier('displayName')
                  ),
                  t.stringLiteral(displayName)
                )
              )
            )
          })
        }
      }
    }
  }

  function isRequireCall(callExpression) {
    return (
      callExpression &&
      callExpression.type === 'CallExpression' &&
      callExpression.callee.name === 'require' &&
      callExpression.arguments.length === 1 &&
      callExpression.arguments[0].value === 'glamorous'
    )
  }
}
