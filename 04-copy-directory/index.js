
const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'fils'), (error, data)=>{
  if(error) console.log(error);
  fs.mkdir(path.join(__dirname, 'files-copy'), ()=>{
    data.forEach(e=>{
      fs.copyFile(path.join(__dirname, `files/${e}`), path.join(__dirname, `files-copy/${e}`), ()=>{} );
    });
  });
});
