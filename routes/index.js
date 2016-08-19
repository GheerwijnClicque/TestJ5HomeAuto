var express = require('express');
var router = express.Router();
// var controls = require('../controls.js');
var VirtualSerialPort = require('udp-serial').SerialPort;
var firmata = require('firmata');
var five = require("johnny-five");

var wifi = require('node-wifi');

// REQUIRES ARDUINO WITH SIMPLEFIRMATA + baud of 115200

// wifi.init({
//     debug : true,
//     iface : null
//     // the OS will find the right network interface if it is null
// });


//create the udp serialport and specify the host and port to connect to
var sp = new VirtualSerialPort({
  host: '192.168.4.1',
  type: 'udp4',
  port: 1025
});

//use the serial port to send a command to a remote firmata(arduino) device
var io = new firmata.Board(sp);
var r1, r2, r3, r4;



/* GET home page. */
router.get('/', function(req, res, next) {
    var allNetworks;


    io.once('ready', function(){
        //Scan networks
        // wifi.scan(function(err, networks) {
        //     console.log('wifi');
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         allNetworks = networks;
        //         console.log(networks);
        //         // res.render('index', { title: 'Express', networks: allNetworks });
        //
        //     }
        // });

        console.log('IO Ready');
        io.isReady = true;

        var board = new five.Board({io: io, repl: true});

        board.on('ready', function(){
            console.log('five ready');
            //Full Johnny-Five support here:
            r1 = new five.Relay(8);
            r2 = new five.Relay(9);
            r3 = new five.Relay(10);
            r4 = new five.Relay(11);

        });

    });
    res.render('index', { title: 'Express'});


});

router.get('/relay/:id', function(req, res) {
    var id = req.params.id;
    toggle(id);
    res.send('good');
});

router.get('/test', function(req, res) {
    res.send('<h2>TESTING</h2>');
    console.log('testing 1, 2');
});

// router.get('/wifi/connect/:ssid', function(req, res) {
//     //Connect to a network
//     var ssid = req.params.ssid;
//
//     wifi.connect({ ssid : ssid, password : ""}, function(err) {
//         if (err) {
//             console.log(err);
//         }
//         console.log('Connected');
//     });
// });

var toggle = function(id) {

    switch (id) {
        case '1':
            console.log('r1 toggled');
            r1.toggle();
            break;
        case '2':
        console.log('r2 toggled');
            r2.toggle();
            break;
        case '3':
        console.log('r3 toggled');
            r3.toggle();
            break;
        case '4':
        console.log('r4 toggled');
            r4.toggle();
            break;
        default:

    }

};



module.exports = router;
