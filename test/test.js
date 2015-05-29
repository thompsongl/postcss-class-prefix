var assert    = require('assert');
var fs        = require('fs');
var postcss    = require('postcss');
var classPrfx = require('..');

function fixture(name) {
  return fs.readFileSync('test/fixtures/' + name, 'utf8').trim();
}

describe('postcss-class-prefix', function() {
  it('prefixes all classes', function() {
    var output = postcss()
                .use(classPrfx('prfx-'))
                .process(fixture('source.css'));
    var expected = fixture('source.expected.css');

    assert.equal(output, expected);
  });

  it('ignores a classes given in `ignore`', function() {
    var out = postcss()
              .use(classPrfx('prfx-', { ignore: /^is-/ }))
              .process(fixture('filter.css'));
    var expected = fixture('filter.expected.css');
    assert.equal(out, expected);
  });
});
