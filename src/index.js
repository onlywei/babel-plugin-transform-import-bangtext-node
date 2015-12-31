export default function ({types: t}) {
  return {
    visitor: {
      ImportDeclaration(path) {
        const node = path.node;
        const specifier = node.specifiers[0];

        t.assertImportDefaultSpecifier(specifier);

        const varName = specifier.local;
        const fsModule = t.callExpression(t.identifier('require'), [t.stringLiteral('fs')]);
        const readFileSync = t.memberExpression(fsModule, t.identifier('readFileSync'));

        path.replaceWith(t.variableDeclaration('var', [
          t.variableDeclarator(varName, t.callExpression(readFileSync, [
            t.stringLiteral(node.source.value.split('!')[0]),
            t.stringLiteral('utf8')
          ]))
        ]));
      }
    }
  };
}
