const fs = require('fs');
const path = require('path');

const textPath = path.join(__dirname, 'text.txt');

const readStream = fs.createReadStream(textPath, 'utf-8');

readStream.on('data', chank=>console.log(chank));
