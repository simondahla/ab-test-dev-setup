// ==UserScript==
// @name         JS&CSS Injection
// @namespace    https://www.spotify.com
// @version      0.1
// @description  Insert JS and CSS to the <head>
// @author       Simon Dahla
// @match        http*://localhost:*/*
// ==/UserScript==

/**
 * Must be written in ES5
 */

(function() {
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
    }

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    function addScript(ls, folder, fileName) {
        if (fileName === null) fileName = 'variant.js';
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');

        script.type = 'text/javascript';
        script.src = ls + folder + fileName;

        script.onload = function() {
            console.info('%c 📣 Script loaded: ' + script.src, consoleStyles.success.join(';') );
        };

        script.onerror = function() {
            console.warn('%c ☠️ Script NOT loaded: ' + script.src, consoleStyles.error.join(';') );
        };

        head.appendChild(script);
    }

    function addStyle(ls, folder, fileName) {
        if (fileName === null) fileName = 'variant.css';
        var head = document.getElementsByTagName('head')[0];
        var style = document.createElement('link');

        style.rel = 'stylesheet';
        style.href = ls + folder + fileName;

        style.onload = function() {
            console.info('%c 📣 Style loaded: ' + style.href, consoleStyles.success.join(';') );
        };

        style.onerror = function() {
            console.warn('%c ☠️ Style NOT loaded: ' + style.href, consoleStyles.error.join(';') );
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

    addStyle(ls, folder, getParameterByName('css') );
    addScript(ls, folder, getParameterByName('js') );

})();
