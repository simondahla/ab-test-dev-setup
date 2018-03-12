// ==UserScript==
// @name         JS&CSS Injection for AB-test-dev-setup
// @version      1.1
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

  function addScript (ls, folder, fileName) {
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

  function getURLParam(key,target){
    var values = [];
    if (!target) target = location.href;

    key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");

    var pattern = key + '=([^&#]+)';
    var o_reg = new RegExp(pattern,'ig');
    while (true){
        var matches = o_reg.exec(target);
        if (matches && matches[1]){
            values.push(matches[1]);
        } else {
            break;
        }
    }

    if (!values.length){
        return null;
    } else {
        return values.length == 1 ? values[0] : values;
    }
  }

  var ls = '//localhost:9000/';
  var folder = getURLParam('folder') || '';

  if (folder !== '') {
    folder = 'experiment/' + folder + '/';
  } else {
    folder = 'experiment/_utils/';
  }

  var css = getURLParam('css') || getURLParam('css[]');
  var js = getURLParam('js') || getURLParam('js[]');

  if (typeof css === 'string') {
    addStyle(ls, folder, css);

  } else if (typeof css === 'object' && css !== null) {
    css.forEach(function(o) {
        addStyle(ls, folder, o);
    });
  } else {
    // default
    addStyle(ls, folder, 'variant.css');
  }

  if (typeof js === 'string') {
    addScript(ls, folder, js);

  } else if (typeof js === 'object' && js !== null) {
    js.forEach(function(o) {
        addScript(ls, folder, o);
    });
  } else {
    // default
    addScript(ls, folder, 'variant.js');
  }


})();
