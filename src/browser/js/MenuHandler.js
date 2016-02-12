'use strict'

const remote = require('remote');
const app = remote.app
const Menu = remote.require('menu');
const MenuItem = remote.require('menu-item');
const currentWindow = remote.getCurrentWindow();

module.exports = function() {
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
}
