/*--------------------------------------------------------------------------------------\
|  _______    _    _____ _             _ _           ________     ___   ___ ___  __     |
| |__   __|  (_)  / ____| |           | (_)         /  ____  \   |__ \ / _ \__ \/_ |    |
|    | | __ _ _  | (___ | |_ _   _  __| |_  ___    /  / ___|  \     ) | | | | ) || |    |
|    | |/ _` | |  \___ \| __| | | |/ _` | |/ _ \  |  | |       |   / /| | | |/ / | |    |
|    | | (_| | |  ____) | |_| |_| | (_| | | (_) | |  | |___    |  / /_| |_| / /_ | |    |
|    |_|\__,_|_| |_____/ \__|\__,_|\__,_|_|\___/   \  \____|  /  |____|\___/____||_|    |
|                                                   \________/                          |
\--------------------------------------------------------------------------------------*/

const { app, BrowserWindow, ipcMain, shell } = require('electron');
const fs = require('fs');
const path = require('path');

app.allowRendererProcessReuse = true;
app.whenReady().then(() => {
    var config = createWindow('app/gui.html', false);
    var preview = createWindow('index.html', true);

    ipcMain.on('save', (event, arg) => {
        console.log(arg);
        // fs.writeSync(path.join(__dirname, 'pages'), data);
    });
});

function createWindow (url, resize) {
    var win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        resizable: resize,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
  
    win.loadFile(url);

    return win;
}