'use strict'

let fs = require('fs'),
    base64ToBlob = require('./Base64ToBlob'),
    DirtyStatus = require('./DirtyStatus'),
    DocumentHandler = require('./DocumentHandler')

$(document).ready(function() {
    $('#title-content').on('keyup', () => {
        if (DocumentHandler.hasCurrentFile())
            DocumentHandler.delaySave()

        if (!isDirty)
            DirtyStatus.isDirty()
    })

    $('.sidebar').on('click', '.sidebar-item', function(evt) {
        if (isDirty && !confirm("You are going to lose your unsaved work, is that ok?"))
            return

        let $this = $(this)
        DocumentHandler.save()
        DocumentHandler.loadFile($this.data('filename'))
    })
})

document.addEventListener('trix-change', () => {
    if (DocumentHandler.hasCurrentFile())
        DocumentHandler.delaySave()

    if (!isDirty)
        DirtyStatus.isDirty()
})

document.addEventListener('trix-attachment-add', (event) => {
    console.log('Attachment added')
    if (!event.attachment.file) return

    // Get the image and convert it to a browser compatible url
    let contentType = 'image/' + event.attachment.file.path.slice(-3)
    let imageData = fs.readFileSync(event.attachment.file.path)
    let base64Image = new Buffer(imageData, 'binary').toString('base64')

    // Create the new blob
    let blob = base64ToBlob(base64Image, contentType);
    let blobUrl = URL.createObjectURL(blob);

    // Add the new blob to the file contents
    imageBlobs[blobUrl] = {
        base64Image: base64Image,
        contentType: contentType
    }

    // Tell trix editor about our newly added image
    event.attachment.setAttributes({
        url: blobUrl,
        href: blobUrl
    })

    // trix editor does this weird preload src url with a blob instead of this value
    let contents = document.getElementById('trix-content').value
    document.querySelector("trix-editor").value = contents

    DirtyStatus.isDirty()
})
