// *Some* environments (phantomjs) don't have es5 (Function.prototype.bind)
require('babel-polyfill');

// this regex should match any files in __tests__ directories
var context = require.context('./__tests__/', true, /.+\.js$/);
context.keys().forEach(context);
