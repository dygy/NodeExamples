let  fs = require('fs');
let readShort = fs.createReadStream(__dirname+'/new.txt','utf8');
let writeShort = fs.createWriteStream(__dirname+'/text.txt');
readShort.on('data',function (chunk) {
 console.log(' \n New Data : \n ');
    writeShort.write(chunk);
});
readShort.pipe(writeShort);

module.exports = {
   readShort:readShort,
    writeShort:writeShort
};