/* eslint-disable */ 
const fs = require('fs')
const path = require('path')
const pathStyles = path.join(__dirname, 'styles')
// const pathBundle =path.join(__dirname, '/project-dist/bundle.css')
const pathBundle =path.join(__dirname, 'project-dist', 'bundle.css')
let arrayCss = []

// fs.readFile(pathBundle, (error,data)=>{
//     if(error)console.log(error)
//     (data) ? fs.unlink(pathBundle,()=>{}) : ''
// })

fs.readdir(pathStyles, (error,data)=>{
    if(error)console.log(error)

    for(const file of data){
        fs.stat(path.join(pathStyles, file), (error, stats)=>{
                    if(error)console.log(error)
                    if(stats.isFile && path.extname(file)== '.css'){
                        fs.readFile(path.join(pathStyles, file), 'utf-8', (error, data1)=>{
                            if(error)console.log(error)
                            arrayCss.push(data1)
                            fs.appendFile(pathBundle, arrayCss.join('\n'), ()=>{})
                        })
                    }
                    
        })

    }
})



// 05-merge-styles