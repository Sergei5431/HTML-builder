const fs = require('fs');
const path = require('path');
const {stdin, stdout, exit} = process;

const pathText = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(pathText, 'utf-8');

stdout.write('Введите текст:\n');



stdin.on('data',  (data)=>{
  writeStream.write(data);
});

process.on('SIGINT', () => exit());
process.on('exit', ()=>stdout.write('До свидания!'));


//   02-write-file  










