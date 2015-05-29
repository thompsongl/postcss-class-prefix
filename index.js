'use strict';
var postcss = require('postcss');

module.exports = postcss.plugin('postcss-class-prefix', classPrefix);

function classPrefix(prefix, options) {
  options = options || {};

  return function(root) {

    root.eachRule(function (rule) {
      if (!rule.selectors){
        return rule;
      }

      rule.selectors = rule.selectors.map(function(selector) {
        if (!isClassSelector(selector)) {
          return selector;
        }

        var classes = selector.split('.');

        return classes.map(function(clss){
          if (classMatchesTest(clss, options.ignore) || clss.trim().length === 0) {
            return clss;
          }
          return prefix + clss;
        }).join('.');
      });
    });
  };
}

/**
 * Determine if class passes test
 *
 * @param {string} clss
 * @param {string} test
 */
function classMatchesTest(clss, test) {
  if(!test) {
    return false;
  }

  if(test instanceof RegExp) {
    return test.exec(clss);
  }
  return clss === test;
}

/**
 * Determine if selector is a class
 *
 * @param {string} selector
 */
function isClassSelector(selector) {
  return selector.indexOf('.') === 0;
}
