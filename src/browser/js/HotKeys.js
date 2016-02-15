'use strict'

let FileHandler = require('./FileHandler'),
    base64ToBlob = require('./Base64ToBlob.js')

let currentFilename = false

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

    let contents = document.getElementById('trix-content').value
    let title = document.getElementById('title-content').value
    let fileContents = JSON.stringify({
        contents,
        title,
        imageBlobs
    })

    if (currentFilename) {
        console.log('Saving to:', currentFilename)
        FileHandler.saveFile(currentFilename, fileContents)

         $('.unsaved-indicator').remove()
        isDirty = false 
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

        $('.unsaved-indicator').remove()
        isDirty = false 
    })
})

// Open file
Mousetrap.bind('command+o', (e) => {
    FileHandler.showOpenDialog((data) => {
        if (!data || !data[0]) {
            console.log('Canceling open...')
            return
        }

        console.log('File name opened:', data[0])

        currentFilename = data[0]
        let fileContents = FileHandler.openFile(data[0])
        fileContents = eval('(' + fileContents.toString() + ')')

        // Resize the title textarea after setting the value
        $('#title-content').val(fileContents.title).trigger('input')
        imageBlobs = fileContents.imageBlobs || {}
        let initialContents = fileContents.contents

        // Convert old blob urls to new ones by copying 
        // imageBlobs and replacing the old 
        // blobUrl keys with new ones.
        let imageBlobsCopy = JSON.parse(JSON.stringify(imageBlobs))
        for (var key in imageBlobsCopy) {
            // Recreate the blob from the base64 image data
            let blob = base64ToBlob(imageBlobsCopy[key].base64Image, imageBlobsCopy[key].contentType)
            let blobUrl = URL.createObjectURL(blob)

            // Copy the old blobUrl data with the new blobUrl
            initialContents = initialContents.replace(key, blobUrl)
            imageBlobs[blobUrl] = imageBlobs[key]
            
            // Remove the old blobUrl data
            delete imageBlobs[key]
        }
        imageBlobsCopy = null

        document.querySelector("trix-editor").value = initialContents

        $('.unsaved-indicator').remove()
        isDirty = false
    })
})
