[![Build Status](https://travis-ci.org/onlywei/babel-plugin-import-bang-text.svg?branch=master)](https://travis-ci.org/onlywei/babel-plugin-import-bang-text)

# babel-plugin-transform-import-bang-text
Transforms `import foo from 'foo!text'` into `var foo = require('fs').readFileSync('foo')`
