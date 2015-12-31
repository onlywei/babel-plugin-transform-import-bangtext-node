[![Build Status](https://travis-ci.org/onlywei/babel-plugin-import-bang-text.svg?branch=master)](https://travis-ci.org/onlywei/babel-plugin-import-bang-text)

# babel-plugin-transform-import-bang-text
Transforms:
```js
import foo from './foo!text';
```
into
```js
var foo = require('fs').readFileSync('./foo', 'utf8');
```

## Installation

```bash
npm install --save-dev babel-plugin-transform-import-bang-text
```

## Usage

This *only* works in Node environments. Do not try to use this plugin in a browser environment.

The intended use is with [babel-register](https://babeljs.io/docs/usage/require/):

```js
require('babel-register')({
  plugins: [
    ['transform-import-bang-text', {basePath: '/path/to/wherever'}]
  ]
});
```

## Options

* `basePath` - Because `fs.readFile()` does not follow the same rules as `require()`, if you ever
  try to import anything that does not begin with `/`, `./`, or `../`, you will need to specify this
  option. The import path will be joined with the given basePath using `path.join(base, target)`.
  Using an absolute base path is recommended. If no basePath is given, this plugin will throw an
  error when transforming imports that do not begin with `/`, `./`, or `../`.

* `encoding` - The encoding option passed to `fs.readFileSync()`. Defaults to `utf8`.

## Why does this plugin exist?

The functionality of this plugin is intended to mirror the [SystemJS text plugin](https://github.com/systemjs/plugin-text) that is used in a browser environment. Using this transform will allow you to import modules written with the SystemJS text plugin into your Node environment.
