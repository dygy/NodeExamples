let events = require('events');
let util = require('util');

let Garple = function (model) {
    this.model = model
};

util.inherits(Garple,events.EventEmitter);

let PS = new Garple('Power Slam');
let SX = new Garple('Suplex');
let GS = new Garple('German Suplex');

let garples = [PS,SX,GS];
garples.forEach(function (garp) {
    garp.on('weight',function (text) {
        console.log(garp.model + ' available weight is - ' + text)
    });

});
PS.emit('weight','80kg');
SX.emit('weight','100kg');
GS.emit('weight','150kg');