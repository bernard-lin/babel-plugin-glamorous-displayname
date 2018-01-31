// import printAST from 'ast-pretty-print'
import {createMacro} from 'babel-plugin-macros'
import handleGlamorousReferences from './handle-glamorous-references'

export default createMacro(glamorousMacro)

function glamorousMacro({references, state, babel}) {
  const {types: t} = babel
  handleGlamorousReferences(references.default, state.file, babel)

  // add a glamorous import to the file
  references.default
    .map(ref => ref.node.name)
    // honestly I don't think it could ever possibly have more than one here
    // but we'll do this just to be safe ¯\_(ツ)_/¯
    .filter((n, i, a) => a.indexOf(n) === i)
    .map(name => {
      return t.importDeclaration(
        [t.importDefaultSpecifier(t.identifier(name))],
        t.stringLiteral('glamorous'),
      )
    })
    .forEach(glamorousImport => {
      state.file.path.node.body.unshift(glamorousImport)
    })
}
