import { jsdom } from 'jsdom';

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;

// https://github.com/tmpvar/jsdom/issues/1137
window.localStorage = window.sessionStorage = {
  getItem: function (key) {
    return this[key];
  },
  setItem: function (key, value) {
    this[key] = value;
  },
  removeItem: function(key) {
    this[key] = null;
  }
};
