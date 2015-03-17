# postcss-class-prefix

A [PostCSS](https://github.com/postcss/postcss) plugin to prefix/namespace classes.

__Example input__

```css
.grid { /* ... */ }
.grid-row { /* ... */ }
.grid-row-col { /* ... */ }
```

__Example output__
`classPrefix('flx-')`
```css
.flx-grid { /* ... */ }
.flx-grid-row { /* ... */ }
.flx-grid-row-col { /* ... */ }
```


<!-- ## Installation

```
npm install post-class-prefix
``` -->

## Usage

```javascript
var fs        = require('fs'),
    rework    = require('postcss'),
    classPrfx = require('postcss-class-prefix');

var css = fs.readFileSync('css/my-file.css', 'utf8').toString();
var out = postcss()
          .use(classPrfx('my-prefix-'))
          .process(css);
```

### Using the `ignore` option

```javascript
var fs    = require('fs');
var rework    = require('postcss');
var classPrfx = require('postcss-class-prefix');

var css = fs.readFileSync('css/my-file.css', 'utf8').toString();
var out = postcss()
          .use(classPrfx('my-prefix-', { ignore: [/\.ng-/, 'some-class-to-ignore']}))
          .process(css);
```

## License

MIT

## Acknowledgements

Based on [rework-class-prefix](https://github.com/jnv/rework-class-prefix) ([originally(https://github.com/johnotander/rework-class-prefix))
