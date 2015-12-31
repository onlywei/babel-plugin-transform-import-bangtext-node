const path = require('path');
const fs = require('fs');
const assert = require('assert');
const babel = require('babel-core');

function trim(str) {
  return str.replace(/^\s+|\s+$/, '');
}

/* eslint-env mocha */
describe('fixtures', () => {
  const fixturesDir = path.join(__dirname, 'fixtures');

  fs.readdirSync(fixturesDir).map((caseName) => {
    if (caseName === '.babelrc') return;

    it(caseName.split('-').join(' '), () => {
      const fixtureDir = path.join(fixturesDir, caseName);
      let expectedError;

      try {
        expectedError = fs.readFileSync(path.join(fixtureDir, 'expected-error.js')).toString();
      } catch (except) {
        // Ignore. This test case is not supposed to error.
      }

      if (expectedError) {
        assert.throws(
          () => babel.transformFileSync(path.join(fixtureDir, 'actual.js')),
          new RegExp(trim(expectedError))
        );
      } else {
        const actual = babel.transformFileSync(path.join(fixtureDir, 'actual.js')).code;
        const expected = fs.readFileSync(path.join(fixtureDir, 'expected.js')).toString();

        assert.equal(trim(actual), trim(expected));
      }

    });
  });
});
