'use strict';

var ping = require('ping');

var pingRunner;


var d = document.querySelector('.log');



var startStopBtn = document.querySelector('.btn-start');

startStopBtn.addEventListener('click', function () {
    if (startStopBtn.innerHTML == 'Start') {
        startStopBtn.innerHTML = 'Stop';
        doPing();
        pingRunner = setInterval(doPing, 10000);
    } else {
        startStopBtn.innerHTML = 'Start';
        clearInterval(pingRunner);
        document.querySelector('.log').innerHTML = document.querySelector('.log').innerHTML + '<br />STOPPED --------------------';
    }
});

function doPing() {
    var hosts = ['bbc.co.uk', 'google.com', 'yahoo.com'];
    hosts.forEach(function(host){
        ping.sys.probe(host, function(isAlive){
            var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';

            var dt = new Date();
            var utcDate = dt.toUTCString();

            document.querySelector('.log').innerHTML = document.querySelector('.log').innerHTML + '<br / >[' + utcDate + '] ' + msg;

            if(d.scrollHeight > d.clientHeight) {
              d.scrollTop = d.scrollHeight - d.clientHeight;
            }
        });
    });
}

function prepareButton(buttonEl, soundName) {
    buttonEl.querySelector('span').style.backgroundImage = 'url("img/icons/' + soundName + '.png")';

    var audio = new Audio(__dirname + '/wav/' + soundName + '.wav');
    buttonEl.addEventListener('click', function () {
        audio.currentTime = 0;
        audio.play();
    });
}

var ipc = require('ipc');

var closeEl = document.querySelector('.close');
closeEl.addEventListener('click', function () {
    ipc.send('close-main-window');
});

ipc.on('global-shortcut', function (arg) {
    var event = new MouseEvent('click');
    soundButtons[arg].dispatchEvent(event);
});

var settingsEl = document.querySelector('.settings');
settingsEl.addEventListener('click', function () {
    ipc.send('open-settings-window');
});