/* global swal */
function showMessage () {
  swal({
    title: 'Wubbalubbadubdub!',
    type: 'input',
    html: true,
    imageUrl: 'http://⚡️.ingenmansland.se/ab-test-dev-setup/rick.png',
    text: `<label>Experiment Folder Name</label>`,

    showCancelButton: false,
    showCloseButton: false,
    allowOutsideClick: false,
    closeOnConfirm: false,
    closeOnCancel: false,

    confirmButtonText: 'Append query parameter!',
    cancelButtonText: 'Ok, whatever'
  },
  function (inputValue) {
    // Will redirect the user to a new URL with query parameters
    inputValue = inputValue.trim()

    if (inputValue === false || inputValue === '') {
      swal.showInputError('You need to write something!')
      return false
    }
    var url = document.location.href

    if (url.match(/\?./)) {
      window.location = url + '&folder=' + inputValue
    } else {
      window.location = url + '?folder=' + inputValue
    }
  })
}

// Load styles
var stylehead = document.getElementsByTagName('head')[0]
var style = document.createElement('link')
style.rel = 'stylesheet'
style.href = 'https://cdn.rawgit.com/t4t5/sweetalert/master/dist/sweetalert.css'

// Load script
var scripthead = document.getElementsByTagName('head')[0]
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = 'https://cdn.rawgit.com/t4t5/sweetalert/master/dist/sweetalert.min.js'

script.onload = function () {
  showMessage()
}

stylehead.appendChild(style)
scripthead.appendChild(script)
