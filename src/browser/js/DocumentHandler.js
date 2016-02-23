'use strict'

let FileHandler = require('./FileHandler'),
    base64ToBlob = require('./Base64ToBlob'),
    DirtyStatus = require('./DirtyStatus')

let DocumentHandler = {}
let currentFilename = false
let openFiles = []
let saveHandle = null
let saveDelay = 1000

DocumentHandler.setCurrentFilename = function(newValue) {
    currentFilename = newValue
}

DocumentHandler.hasCurrentFile = function() {
    return currentFilename !== false
}

DocumentHandler.clearSavehandle = function() {
    clearTimeout(saveHandle)
}

DocumentHandler.delaySave = function() {
    DocumentHandler.clearSavehandle()
    saveHandle = setTimeout(function() {
        DocumentHandler.save()
    }, saveDelay)
}

DocumentHandler.loadFile = function(filename) {
    currentFilename = filename
    let fileContents = FileHandler.openFile(filename)
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
        console.log('Recreating blobUrl key:', key)
        let blob = base64ToBlob(imageBlobsCopy[key].base64Image, imageBlobsCopy[key].contentType)
        let blobUrl = URL.createObjectURL(blob)

        // Copy the old blobUrl data with the new blobUrl
        if (initialContents.match(key) !== null) {
            console.log('Replacing with:', blobUrl)
            initialContents = initialContents.split(key).join(blobUrl)
            imageBlobs[blobUrl] = imageBlobs[key]
        } else {
            console.log('Was not found and is being removed:', key)
        }

        // Remove the old blobUrl data
        delete imageBlobs[key]
    }
    imageBlobsCopy = null

    document.querySelector("trix-editor").value = initialContents

    DocumentHandler.createSidebarItem(currentFilename, fileContents.title, fileContents.contents)
    DirtyStatus.isClean()
}

DocumentHandler.save = function() {
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
    FileHandler.showSaveDialog(title + '.trix', function(filename) {
        console.log('File name received:', filename)
        if (!filename) {
            console.log('Canceling save...')
            return
        }

        currentFilename = filename
        FileHandler.saveFile(currentFilename, fileContents)
        DocumentHandler.createSidebarItem(currentFilename, title, contents)

        DirtyStatus.isClean()
    })
}

DocumentHandler.createSidebarItem = function(filename, title, contents) {
    let previewContents = contents.replace(/(<([^>]+)>)/ig, ' ').slice(0, 100)

    $('.sidebar-item').removeClass('active')
    if (openFiles.indexOf(filename) === -1) {
        $('.sidebar-no-files').remove()
        $('.sidebar').append(`
        <div class="sidebar-item active" data-filename="${filename}">
            <h1 class="sidebar-item-title">${title}</h1>
            <p class="sidebar-item-body">${previewContents}</p>
        </div>
        `)
        openFiles.push(filename)
    } else {
        $(`[data-filename="${filename}"`).addClass('active')
    }
}

module.exports = DocumentHandler
