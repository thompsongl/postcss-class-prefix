'use strict';
var postcss = require('postcss');

module.exports = postcss.plugin('postcss-class-prefix', classPrefix);

function classPrefix(prefix, options) {
  options = options || {};

  return function(root) {

    root.walkRules(function (rule) {
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
  if (!test) {
    return false;
  }

  clss = clss.trim();

  if (test instanceof RegExp) {
    return test.exec(clss);
  }

  if (Array.isArray(test)) {
    // Reassign arguments
    var tests = test;
    test = undefined;

    return tests.some(function(test) {
      if (test instanceof RegExp) {
        return test.exec(clss);
      } else {
        return clss === test;
      }
    });
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
