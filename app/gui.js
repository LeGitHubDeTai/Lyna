/*--------------------------------------------------------------------------------------\
|  _______    _    _____ _             _ _           ________     ___   ___ ___  __     |
| |__   __|  (_)  / ____| |           | (_)         /  ____  \   |__ \ / _ \__ \/_ |    |
|    | | __ _ _  | (___ | |_ _   _  __| |_  ___    /  / ___|  \     ) | | | | ) || |    |
|    | |/ _` | |  \___ \| __| | | |/ _` | |/ _ \  |  | |       |   / /| | | |/ / | |    |
|    | | (_| | |  ____) | |_| |_| | (_| | | (_) | |  | |___    |  / /_| |_| / /_ | |    |
|    |_|\__,_|_| |_____/ \__|\__,_|\__,_|_|\___/   \  \____|  /  |____|\___/____||_|    |
|                                                   \________/                          |
\--------------------------------------------------------------------------------------*/

const { ipcRenderer, dialog } = require("electron");
var services = require('../lib/services.json');

if(typeof $ == "undefined"){
    var $ = require('jquery');
}

var data = null;

loadServices();
$('#logoPage').on('click', () => {
    ipcRenderer.send('logoSelect', 'open');
})
$('#backgroundPage').on('click', () => {
    ipcRenderer.send('backgroundSelect', 'open');
})
$('.addlinks').on('click', () => {
    $('.addlinks').before(`
        <div class="element">
            <label>Name</label>
            <input type="text" id="linkName">
            <label>Link:</label>
            <input type="url" id="linkURL">
            <label>Service</label>
            <select id="linkService">
                <option value="Select An Service !" hidden disabled selected></option>
            </select>
            <label>Custom icon (optional):</label>
            <input type="url" id="linkIcon">
        </div>
    `);
    loadServices();
});
$('input').on('change', () => {
    reload();
});
$('select').on('change', () => {
    reload();
});
$('.save').on('click', () => {
    ipcRenderer.sendSync('save', JSON.stringify(data));
});
$('#removeLogo').on('click', () => {
    data.logo = "pages/home/lyna.png";
    reload();
});
$('#removeBG').on('click', () => {
    data.background = "";
    reload();
});

ipcRenderer.on('logoSelected', (event, arg) => {
    data.logo = arg;
    reload();
});
ipcRenderer.on('backgroundSelected', (event, arg) => {
    data.background = arg;
    reload();
});

function loadServices(){
    $('#linkService option').remove();
    $('#linkService').append(`<option value="Select An Service !" hidden disabled selected></option>`);
    for(i=0;i<services.all.length;i++){
        $('#linkService').append(`<option value="${services.all[i].replace('.png', '')}">${services.all[i].replace('.png', '')}</option>`);
    }
}

function reload(){
    data.name = $('#namePage').val();
    data.description = $('#descriptionPage').val();
    data.power = $('#powerButton').prop('checked');
    // data.font = $('#fontPage').val();

    data.colors = [
        $('#color1').val(),
        $('#color2').val(),
        $('#color3').val(),
        $('#color4').val()
    ];

    var links = [];
    $('.links .element').each((index, element) => {
        let link = {};
        link.name = $(element).children('#linkName').val();
        link.link = $(element).children('#linkURL').val();
        link.service = $(element).children('#linkService').val();
        if($(element).children('#linkIcon').val() != ""){
            link.icon = $(element).children('#linkIcon').val();
        }
        
        links.push(link);
    });

    data.links = links;

    ipcRenderer.send('change', JSON.stringify(data));
}