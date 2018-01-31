import handleGlamorousReferences from './handle-glamorous-references'
import looksLike from './looks-like'

export default function(babel) {
  const {types: t} = babel
  const references = new Set()
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
          references.add(reference)
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
            references.add(reference)
          })
        }
      },
      Program: {
        exit(path, {file}) {
          handleGlamorousReferences(Array.from(references), file, babel)
        },
      },
    },
  }
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
