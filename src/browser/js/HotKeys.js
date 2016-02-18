'use strict'

let FileHandler = require('./FileHandler'),
    base64ToBlob = require('./Base64ToBlob'),
    DirtyStatus = require('./DirtyStatus'),
    DocumentHandler = require('./DocumentHandler')

// New File
Mousetrap.bind('command+n', (e) => {
    imageBlobs = {}
    currentFilename = false
    document.getElementById('title-content').value = ''
    document.querySelector("trix-editor").value = ''
})

// Save File
Mousetrap.bind('command+s', (e) => {
    console.log('Saving...')

    DocumentHandler.save()
})

// Open file
Mousetrap.bind('command+o', (e) => {
    FileHandler.showOpenDialog((data) => {
        if (!data || !data[0]) {
            console.log('Canceling open...')
            return
        }

        console.log('Opening:', data[0])

        DocumentHandler.loadFile(data[0])
    })
})
