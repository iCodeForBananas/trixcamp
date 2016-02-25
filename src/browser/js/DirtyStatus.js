'use strict'

let DirtyStatus = {}

DirtyStatus.isDirty = function() {
    let contents = document.getElementById('trix-content').value
    let title = document.getElementById('title-content').value
    if (contents.length === 0 && title.length === 0)
        return

    $('.unsaved-indicator').remove()
    $('body').append('<div class="unsaved-indicator">*</div>')
    isDirty = true
}

DirtyStatus.isClean = function() {
    $('.unsaved-indicator').remove()
    isDirty = false
}

module.exports = DirtyStatus
