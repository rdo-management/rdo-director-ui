// *Some* environments (phantomjs) don't have es5 (Function.prototype.bind)
require('babel-core/polyfill');

// this regex should match any files in __tests__ directories
var context = require.context('.', true, /__tests__\/.+\.js$/);
context.keys().forEach(context);
