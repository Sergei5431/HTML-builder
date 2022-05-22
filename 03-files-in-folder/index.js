
const fs = require('fs');
const path = require('path');
const patnFolter = path.join(__dirname, 'secret-folder');

fs.readdir(patnFolter, {withFileTypes:true}, (error, data)=>{
  if(error){
    console.log (error);
  }
  for(let file of data){
    if(file.isFile()){
      const pathFile = path.join(patnFolter, file.name);
      const fileExtname = path.extname(pathFile);
      const fileName = path.basename(pathFile, fileExtname);
            
      fs.stat(pathFile, (error, stats) => { 
        if(error)  error;
                
        const kb = (stats.size / 1024).toFixed();
        console.log(`${fileName} - ${fileExtname.slice(1)} - ${kb}kb`);
                
      });
    }
  }
});


// 03-files-in-folder