'use strict'

// Globally available vars
let $ = require('jquery')

let isDirty = false,
    imageBlobs = {}

require('./js/MenuHandler')
require('./js/TrixEventHandlers')
require('./js/HotKeys')
require('./js/StickyHeader')
require('./js/AutoResize')

$(document).ready(function() {
    // Focus user on the title of the document immediately
    $('#title-content').focus()
})
