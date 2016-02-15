'use strict'

let DirtyStatus = {}

DirtyStatus.isDirty = function() {
    $('.unsaved-indicator').remove()
    $('body').append('<div class="unsaved-indicator">*</div>')
    isDirty = true
}

DirtyStatus.isClean = function() {
    $('.unsaved-indicator').remove()
    isDirty = false
}

module.exports = DirtyStatus
