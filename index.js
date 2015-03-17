'use strict';

module.exports = ClassPrefix;

function ClassPrefix(prefix, options) {
  options = options || {};

  function isIgnoredClass(clss) {
    return classMatchesTest(clss, options.ignore);
  }

  return function classPrefix(root) {

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
          if(isIgnoredClass(clss) || clss.trim().length === 0) {
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
