A/B-test dev setup
===

# Get started

## Prerequisits
- Node
- Yarn
- Gulp CLI

## Installation



1. Colne repo `https://github.com/simondahla/ab-test-dev-setup.git`
2. Enter folder `cd ab-test-dev-setup`
3. Run `yarn install`
4. Install the _User Script_ from `_utils/userscript.js` in to your user script manager like Temper Monkey or Grease Monkey

## Starting development
1. Create a new folder with two files in it
  - Name the folder, do it with "URL compapability" in mind - use lowecase charachters and hyphens, avoid spaces and special characters
  - Name the files `variant.css` and `variant.js`
    ​
2. Run `gulp --proxy "https://www.google.com/"` and repace the URL with the site you are working on.
   - **Please note** that the `--proxy` value must be the same as the actual URL (_www_ and non _www_ matters etc.), otherwise it probably will trigger a redirect.
     ​
3. Your site will open in your default browser with the URL https://localhost:9000/
   ​
4. Add query parameters to spcify the folder and file names for what you want to have incjected
  - Do so by using the form
  - Or by appending query parameters to the URL
    - `folder=example-folder-name`
    - `css=variant.css`
    - `js=variant.js`
    - _e.g._ `https://localhost:9000/?folder=example-folder-name&css=variant.css&js=variant.js`

### Additional settings

#### Specifying custom host name

1. Add custom hostname to `/etc/hosts` and map it to `127.0.0.1` (localhost)
   - e.g. `127.0.0.1 localhost.se`
2. When starting _gulp_ add `—host` as an extra parameter to override the default hostname
   - e.g. `gulp --proxy "https://www.google.se/" --host "localhost.se" `



