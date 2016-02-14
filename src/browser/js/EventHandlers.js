'use strict'

let fs = require('fs')

document.addEventListener('trix-attachment-add', (event) => {
    if (!event.attachment.file) return

    // Get the image and convert it to a browser compatible url
    let base64Url = 'data:image/' + event.attachment.file.path.slice(-3) + ';base64,'
    let imageData = fs.readFileSync(event.attachment.file.path)
    let base64Image = new Buffer(imageData, 'binary').toString('base64')
    
    // Tell trix editor about our newly added image
    event.attachment.setAttributes({
        url: base64Url + base64Image,
        href: base64Url + base64Image
    })

    // trix editor does this weird preload src url with a blob instead of this value
    let contents = document.getElementById('trix-content').value
    document.querySelector("trix-editor").value = contents
})
