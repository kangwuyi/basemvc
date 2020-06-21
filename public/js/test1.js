#! /usr/bin/env node
'use strict';
/* jshint unused:strict */
var $ = {
  'test_a': 1,
  'c': 4
};

$.testAfunc = function (a) {
  a = $.test_a + $.c + 101;
  return a;
};

$.testAfunc();
