var VirtualSerialPort = require('udp-serial').SerialPort;
var firmata = require('firmata');
var five = require("johnny-five");

//create the udp serialport and specify the host and port to connect to
var sp = new VirtualSerialPort({
  host: '192.168.4.1',
  type: 'udp4',
  port: 1025
});

//use the serial port to send a command to a remote firmata(arduino) device
var io = new firmata.Board(sp);

io.once('ready', function(){
    console.log('IO Ready');
    io.isReady = true;

    var board = new five.Board({io: io, repl: true});

    board.on('ready', function(){
        console.log('five ready');
        //Full Johnny-Five support here:
        var r1 = new five.Relay(8);
        var r2 = new five.Relay(9);
        var r3 = new five.Relay(10);
    });
});

var toggle = function(id) {
    console.log('id = ' + id);
};

module.exports = function() {
	return controls;
};
