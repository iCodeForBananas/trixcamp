'use strict'

let $ = require('jquery'),
    FileHandler = require('./js/FileHandler.js')

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

        document.getElementById('title-content').value = fileContents.title
        document.querySelector("trix-editor").value = fileContents.contents
    })
})




const remote = require('remote');
const app = remote.app
const Menu = remote.require('menu');
const MenuItem = remote.require('menu-item');

const currentWindow = remote.getCurrentWindow();

let rightClickPosition = null;

var template = [{
    label: "Application",
    submenu: [
        { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
        { type: "separator" },
        { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
    ]}, {
    label: "Edit",
    submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
    ]}
];

Menu.setApplicationMenu(Menu.buildFromTemplate(template));

var menu = new Menu();
menu.append(new MenuItem({ label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" }))
menu.append(new MenuItem({ label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" }))
menu.append(new MenuItem({ type: "separator" }))
menu.append(new MenuItem({ label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" }))
menu.append(new MenuItem({ label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" }))
menu.append(new MenuItem({ label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" }))
menu.append(new MenuItem({ label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }))

window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  menu.popup(remote.getCurrentWindow());
}, false);
