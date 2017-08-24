// ==UserScript==
// @name         JS&CSS Injection ab-test-dev-setup
// @version      1.0
// @description  Insert JS and CSS to the <head>
// @author       Simon Dahla
// @copyright    2017+, Simon Dahla
// @match        http*://localhost:*/*
// @include      /ab=(true|1)/
// @icon         http://⚡️.ingenmansland.se/ab-test-dev-setup/icon.png
// @icon64       http://⚡️.ingenmansland.se/ab-test-dev-setup/icon64.png
// @supportURL   https://github.com/simondahla/ab-test-dev-setup/issues
// @downloadURL  https://github.com/simondahla/ab-test-dev-setup/
// ==/UserScript==

/**
 * N.B. All code in this file must be written in ES5
 */

/* eslint-disable semi */

(function () {
  var consoleStyles = {
    success: [
      'background-color: green;',
      'color: white;',
      'display: block;',
      'padding: .5em 1em;',
      'margin: 1em 0;'
    ],
    error: [
      'background-color: red;',
      'color: white;',
      'display: block;',
      'padding: .5em 1em;',
      'margin: 1em 0;'
    ]
  };

  function getParameterByName (name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    var results = regex.exec(url);

    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  function addScript (ls, folder, fileName) {
    if (fileName === null) fileName = 'variant.js';
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');

    script.type = 'text/javascript';
    script.src = ls + folder + fileName;

    script.onload = function () {
      console.info('%c 📣 Script loaded: ' + script.src, consoleStyles.success.join(';'));
    };

    script.onerror = function () {
      console.warn('%c ☠️ Script NOT loaded: ' + script.src, consoleStyles.error.join(';'));
    };

    head.appendChild(script);
  }

  function addStyle (ls, folder, fileName) {
    if (fileName === null) fileName = 'variant.css';
    var head = document.getElementsByTagName('head')[0];
    var style = document.createElement('link');

    style.rel = 'stylesheet';
    style.href = ls + folder + fileName;

    style.onload = function () {
      console.info('%c 📣 Style loaded: ' + style.href, consoleStyles.success.join(';'));
    };

    style.onerror = function () {
      console.warn('%c ☠️ Style NOT loaded: ' + style.href, consoleStyles.error.join(';'));
    };

    head.appendChild(style);
  }

  var ls = '//localhost:9000/';
  var folder = getParameterByName('folder') || '';

  if (folder !== '') {
    folder = 'experiment/' + folder + '/';
  } else {
    folder = 'experiment/_utils/';
  }

  addStyle(ls, folder, getParameterByName('css'));
  addScript(ls, folder, getParameterByName('js'));
})();
