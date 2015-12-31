import path from 'path';

export default function ({types: t}) {
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
            t.stringLiteral(state.opts.encoding || 'utf8')
          ]))
        ]));
      }
    }
  };

  function resolveImportPath(target, base) {
    // target path begins with '/', './', or '../'
    if (/^\/|^\.\/|^\.\.\//.test(target)) {
      return target;
    }

    if (typeof base !== 'string') {
      throw new Error(`Cannot import '${target}!text' without specifying a basePath option.`);
    }

    return path.join(base, target);
  }
}
