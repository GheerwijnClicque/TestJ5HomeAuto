var express = require('express');
var router = express.Router();
// var controls = require('../controls.js');
var VirtualSerialPort = require('udp-serial').SerialPort;
var firmata = require('firmata');
var five = require("johnny-five");
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('home.db');

var wifi = require('node-wifi');

// REQUIRES ARDUINO WITH FIRMATA + baud of 115200

//create the udp serialport and specify the host and port to connect to
var sp = new VirtualSerialPort({
  host: '192.168.4.1',
  type: 'udp4',
  port: 1025
});

//use the serial port to send a command to a remote firmata(arduino) device
var io = new firmata.Board(sp);
var r1, r2, r3, r4;
var relays = [];


/* GET home page. */
router.get('/', function(req, res, next) {

    console.log('taking a looong time...');
    io.once('ready', function(){
        console.log('IO Ready');
        io.isReady = true;

        var board = new five.Board({io: io, repl: true});

        board.on('ready', function(){
            console.log('five ready');

            relays = [  new five.Relay({pin: 2, id: 2}),
                        new five.Relay({pin: 3, id: 3}),
                        new five.Relay({pin: 4, id: 4}),
                        new five.Relay({pin: 5, id: 5}),
                        new five.Relay({pin: 6, id: 6}),
                        new five.Relay({pin: 7, id: 7}),
                        new five.Relay({pin: 8, id: 8}),
                        new five.Relay({pin: 9, id: 9}),
                        new five.Relay({pin: 10, id: 10}),
                        new five.Relay({pin: 11, id: 11}),
                    ];
            // this.repl.inject({
            //     relay: r3
            //   });
        });
    });
    res.render('index', { title: 'Express'});
});

router.get('/relay/:id', function(req, res) {
    var pin = req.params.id;
    toggle(pin);
});

router.get('/test', function(req, res) {
    res.send('<h2>TESTING</h2>');
    console.log('testing 1, 2');
});

var toggle = function(id) {
    relays.forEach(function(item, index) {
        if(item.pin == id) {
            item.toggle();
        }
    });
};

router.get('/devices', function(req, res) {
    db.serialize(function() {
        var data;
		db.all("SELECT * from DEVICES INNER JOIN LOCATIONS on location_id = id", function(error, row) {
			data = row;
            res.send(JSON.stringify(data));
            console.log(data);
		});
	});
});

router.get('/locations', function(req, res) {
    db.serialize(function() {
        var data;
		db.all("SELECT * from LOCATIONS", function(error, row) {
			data = row;
            res.send(JSON.stringify(data));
            // console.log(data);
		});
	});
});

router.get('/components', function(req, res) {
    db.serialize(function() {
        var data;
		db.all("SELECT * from COMPONENTS", function(error, row) {
			data = row;
            res.send(JSON.stringify(data));
            // console.log(data);
		});
	});
});

router.post('/addDevice', function(req, res) {
    console.log('new device: ');
    console.log(req.body.component);
    var name = req.body.name;
    var location = req.body.location;
    var pin = req.body.pin;
    var component = req.body.component;

    if(component == 'RELAY') {
        relay = new five.Relay(pin);
        console.log(relay);
    }

    db.serialize(function() {
        db.run("INSERT INTO DEVICES (location_id, name, pin, component) VALUES ($location, $name, $pin, $component)", {$name: name, $location: location, $pin: pin, $component: component}, function() {
            res.send(200);
        });
    });
});

router.post('/deleteDevice', function(req, res) {
    db.run("DELETE FROM DEVICES WHERE deviceid = $id", {$id: req.body.id}, function(error, row) {
        console.log(this.changes);
        res.send(200);
    });
});

module.exports = router;
