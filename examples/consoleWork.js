let count = require('./arr');

let events = require('events');

let myEmit = new events.EventEmitter();

myEmit.on('some_event',function (text) {

    console.log(count.arrayCounter([1,49,19]));

    console.log(text);

    console.log(count.anotherFunction(9));

});

myEmit.emit('some_event','It worked');