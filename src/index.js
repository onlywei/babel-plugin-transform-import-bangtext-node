import path from 'path';

export default function ({types: t}) {
  const relativeOrAbsolutePath = new RegExp('^/|^./|^../');

  return {
    visitor: {
      ImportDeclaration(path, state) {
        const node = path.node;
        const importTarget = node.source.value;

        if (!/!text$/.test(importTarget)) {
          return;
        }

        const specifier = node.specifiers[0];

        t.assertImportDefaultSpecifier(specifier);

        const varName = specifier.local;
        const fsModule = t.callExpression(t.identifier('require'), [t.stringLiteral('fs')]);
        const readFileSync = t.memberExpression(fsModule, t.identifier('readFileSync'));

        path.replaceWith(t.variableDeclaration('var', [
          t.variableDeclarator(varName, t.callExpression(readFileSync, [
            t.stringLiteral(resolveImportPath(importTarget.split('!')[0], state.opts.basePath)),
            t.stringLiteral('utf8')
          ]))
        ]));
      }
    }
  };

  function resolveImportPath(target, base) {
    return relativeOrAbsolutePath.test(target) ? target : path.join(base, target);
  }
}
