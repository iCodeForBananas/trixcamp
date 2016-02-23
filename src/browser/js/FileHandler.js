'use strict'

let _ = require('lodash'),
    remote = require('remote'),
    shell = remote.require('shell'),
    fs = require('fs'),
    BrowserWindow = remote.require('browser-window'),
    dialog = remote.require('dialog')

let FileHandler = {}

FileHandler.showOpenDialog = (cb) => {
    dialog.showOpenDialog({}, (data) => {
       cb(data)
    })
}

FileHandler.showSaveDialog = (defaultPath, cb) => {
    defaultPath = defaultPath || ''
    return dialog.showSaveDialog({
        defaultPath
    }, (data) => {
        return cb(data)
    })
}

FileHandler.openFile = (filename) => {
    return fs.readFileSync(filename)
}

FileHandler.openLastFile = () => {
    // if (!localStorageService.get('lastOpenedSketchFilename')) return

    // let filename = localStorageService.get('lastOpenedSketchFilename')
    // console.log('Opening last opened sketch', filename)
    // this.openSketchFile(filename)
}

FileHandler.saveFile = (filename, contents) => {
    fs.writeFile(filename, contents, function(err) {
        if (err) console.error(err)
    })
}

module.exports = FileHandler
