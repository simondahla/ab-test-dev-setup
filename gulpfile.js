var gulp = require('gulp')
var util = require('gulp-util')
var browserSync = require('browser-sync').create()

// use default task to launch Browsersync and watch JS files
gulp.task('default', function () {
  var __proxy = util.env.proxy || 'https://www.google.se/'
  __proxy = __proxy.toString()

  // Serve files from the root of this project
  browserSync.init({
    port: 9000,
    proxy: {
      target: __proxy,
      ws: true
    },
    serveStatic: [{
      route: '/experiment',
      dir: '.'
    }],
    https: {
      key: '_utils/server.key',
      cert: '_utils/server.crt'
    }
  })

  // add browserSync.reload to the tasks array to make
  // all browsers reload after tasks are complete.
  gulp.watch('*/*.css').on('change', browserSync.reload)
  gulp.watch('*/*.js').on('change', browserSync.reload)
})
