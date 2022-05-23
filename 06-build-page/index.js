const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;
const styles = path.join(__dirname,'styles');
const newFolder = path.join(__dirname, 'project-dist');
const assets = path.join(__dirname, 'assets');
const newAssets = path.join(newFolder, 'assets');
const components = path.join(__dirname, 'components');

function createStyles(){
  fs.readdir(styles, (err, files) => {
    if (err)
      console.log(err);
    else {
      const newfile = fs.createWriteStream(path.join(newFolder,'style.css'));
      files.forEach(file => {
        if(file.split('.')[1]=='css'){
          const read = fs.createReadStream(styles+'\\'+file, 'utf8');
          read.on('data',(data) => {
            newfile.write(data);
          });
        }
      });
    }
  });
}
function createDir(createfolder){
  fs.stat(createfolder, err=> {
    if (!err) {
       
    }else if (err.code === 'ENOENT') {
      fsPromises.mkdir(createfolder);
    }
  });
}
function copyAssets(start,end){
  fs.readdir(start, (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        fs.stat(start+'\\'+file, (error, stats) => {
          if(stats.isFile()){
            fs.copyFile(start+'\\'+file, end+'\\'+file, (err) => {
                if(err) console.log(err)
            });
          }else{
            createDir(end+'\\'+file);
            copyAssets(start+'\\'+file, end+'\\'+file);
          }
        });
      });
    }
  });
}
function createHTML(){
  var html = '';
  const read = fs.createReadStream(__dirname+'\\template.html', 'utf8');
  read.on('data',(data) => {
    html=data;
    fs.readdir(components, (err, files) => {
      if (err)
        console.log(err);
      else {
        const newfile = fs.createWriteStream(path.join(newFolder,'index.html'));
        newfile.write('');
        files.forEach(file => {
          if(file.split('.')[1]=='html'){
            const read = fs.createReadStream(components+'\\'+file, 'utf8');
            fs.readFile(components+'\\'+file, 'utf8', (err, data) => {
              if (err) {
                console.error(err);
                return;
              }
              html = html.replace('{{'+file.split('.')[0]+'}}',data);
              fs.writeFile(path.join(newFolder,'index.html'), html, error=>{
                if(error) throw error;
              });
            });            
          }
        });
      }
    });
  });
}

createDir(newFolder);
createDir(newAssets);
createStyles();
copyAssets(assets,newAssets);
createHTML();