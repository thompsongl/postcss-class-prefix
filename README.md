# postcss-class-prefix [![Build Status](https://secure.travis-ci.org/thompsongl/postcss-class-prefix.png?branch=master)](http://travis-ci.org/thompsongl/postcss-class-prefix)

A [PostCSS](https://github.com/postcss/postcss) plugin to prefix/namespace classes.

Avoid collisions with other libraries/stylesheets by prefixing your components with a namespace.

__Example input__

```css
.Component { /* ... */ }
.Component--modifier { /* ... */ }
.Component-descendent { /* ... */ }
```

__Example output__
`classPrefix('pfx-')`
```css
.pfx-Component { /* ... */ }
.pfx-Component--modifier { /* ... */ }
.pfx-Component-descendent { /* ... */ }
```


## Installation

```
npm install postcss-class-prefix
```

## Usage

```javascript
var fs        = require('fs');
var postcss   = require('postcss');
var classPrfx = require('postcss-class-prefix');

var css = fs.readFileSync('css/my-file.css', 'utf8').toString();
var out = postcss()
          .use(classPrfx('my-prefix-'))
          .process(css);
```

### Using the `ignore` option

```javascript
var fs        = require('fs');
var postcss   = require('postcss');
var classPrfx = require('postcss-class-prefix');

var css = fs.readFileSync('css/my-file.css', 'utf8').toString();
var out = postcss()
          .use(classPrfx('my-prefix-', { ignore: [/ng-/, 'some-class-to-ignore']}))
          .process(css);
```

## License

MIT

## Acknowledgements

* Based on [rework-class-prefix](https://github.com/jnv/rework-class-prefix) ([originally](https://github.com/johnotander/rework-class-prefix))
