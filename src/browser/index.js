'use strict'

let $ = require('jquery'),
    FileHandler = require('./js/FileHandler')

require('./js/MenuHandler')

let currentFilename = false

// New File
Mousetrap.bind('command+n', (e) => {
    currentFilename = false
    document.getElementById('title-content').value = ''
    document.querySelector("trix-editor").value = ''
})

// Save File
Mousetrap.bind('command+s', (e) => {
    console.log('Saving...')

    let contents = document.getElementById('trix-content').value
    let title = document.getElementById('title-content').value
    let fileContents = JSON.stringify({
        contents,
        title
    })

    if (currentFilename) {
        console.log('Saving to:', currentFilename)
        FileHandler.saveFile(currentFilename, fileContents)
        return
    }

    console.log('Opening save dialog...')
    FileHandler.showSaveDialog(function(filename) {
        console.log('File name received:', filename)
        if (!filename) {
            console.log('Canceling save...')
            return
        }

        currentFilename = filename
        FileHandler.saveFile(currentFilename, fileContents)
    })
})

// Open file
Mousetrap.bind('command+o', (e) => {
    FileHandler.showOpenDialog((data) => {
        if (!data[0]) {
            console.log('Canceling open...')
            return
        }

        console.log('File name opened:', data[0])

        currentFilename = data[0]
        let fileContents = FileHandler.openFile(data[0])
        fileContents = eval('(' + fileContents.toString() + ')')

        // Resize the title textarea after setting the value
        $('#title-content').val(fileContents.title).trigger('input')
        document.querySelector("trix-editor").value = fileContents.contents
    })
})

$(document).ready(function() {
    // Activates the auto resizing textarea
    $('#title-content').textareaAutoSize();

    // Ensure that the title is at the correct size on focus
    var ta = document.querySelector('textarea');
    ta.addEventListener('focus', function(){
        $('#title-content').trigger('input');
    });
})
