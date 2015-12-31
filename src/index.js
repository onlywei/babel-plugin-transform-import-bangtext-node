export default function ({types: t}) {
  return {
    visitor: {
      ImportDeclaration(path) {
        const varName = path.node.specifiers[0].local; // TODO: assertImportDefaultSpecifier
        const fsModule = t.callExpression(t.identifier('require'), [t.stringLiteral('fs')]);
        const readFileSync = t.memberExpression(fsModule, t.identifier('readFileSync'));

        path.replaceWith(t.variableDeclaration('var', [
          t.variableDeclarator(varName, t.callExpression(readFileSync, [
            t.stringLiteral(path.node.source.value.split('!')[0]),
            t.stringLiteral('utf8')
          ]))
        ]));
      }
    }
  };
}
