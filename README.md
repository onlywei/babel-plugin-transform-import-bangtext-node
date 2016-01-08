[![Build Status](https://travis-ci.org/onlywei/babel-plugin-transform-import-bangtext-node.svg?branch=master)](https://travis-ci.org/onlywei/babel-plugin-transform-import-bangtext-node)

# babel-plugin-transform-import-bangtext-node
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
npm install --save-dev babel-plugin-transform-import-bangtext-node
```

## Usage

This *only* works in Node environments. Do not try to use this plugin in a browser environment.

```js
require('babel-register')({
  plugins: [
    ['transform-import-bangtext-node', {basePath: '/path/to/wherever'}]
  ]
});
```

## Options

* `basePath` - When importing anything that does not begin with `/`, `./`, or `../`, this option can
  be set to join with the path using `path.join(basePath, target)`. Using an absolute base path is
  recommended.

* `encoding` - The encoding option passed to `fs.readFileSync()`. Defaults to `utf8`.

## Why does this plugin exist?

The functionality of this plugin is intended to mirror the
[SystemJS text plugin](https://github.com/systemjs/plugin-text) that is used in a browser
environment. Using this transform will allow you to import modules written with the SystemJS text
plugin into your Node environment.
