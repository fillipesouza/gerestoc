const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

function createWindow() {
    const filePath = path.join(process.resourcesPath, './build/index.html')
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, './build/index.html'),
        protocol: 'file:',
        slashes: true
    });


    let win = new BrowserWindow({
            width: 1200,
            height: 600,
            webPreferences: { nodeIntegration: true }
        })
        //win.webContents.openDevTools()
    win.loadURL(startUrl)

    win.focus();


}

app.whenReady().then(createWindow)