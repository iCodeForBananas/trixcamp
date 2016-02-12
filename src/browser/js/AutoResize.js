'use strict'

$(document).ready(function() {
    // Activates the auto resizing textarea
    $('#title-content').textareaAutoSize();

    // Ensure that the title is at the correct size on focus
    var ta = document.querySelector('textarea');
    ta.addEventListener('focus', function(){
        $('#title-content').trigger('input');
    });
})
