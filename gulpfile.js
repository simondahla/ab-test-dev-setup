var gulp = require('gulp')
var util = require('gulp-util')
var browserSync = require('browser-sync').create()

var __proxy = util.env.proxy || 'https://www.google.se/'
__proxy = __proxy.toString()

var __host = '//' + util.env.host || '//localhost'
__host = __host.toString()

// use default task to launch Browsersync and watch JS files
gulp.task('default', function () {
  // Serve files from the root of this project
  browserSync.init({
    host: __host,
    open: 'external',
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
