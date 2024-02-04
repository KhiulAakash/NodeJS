const fs=require('fs');
const path=require('path');

const dirPath=path.join(__dirname,'crud');
const filePath=`${dirPath}/index.txt`
// fs.writeFileSync(filePath,"File has been created.")

// const content=fs.readFileSync(filePath,'utf-8');
// console.log(content);

// fs.readFile(filePath,'utf-8',(err,file)=>{
//     console.log(file)
// })

// fs.appendFile(filePath,' And file has been append.',(err)=>{
//     if(!err) console.log("Successfull");
// })

// fs.rename(filePath,`${dirPath}/renamed.txt`,(err)=>{
//     if(!err) console.log("Successfull");
// })

fs.unlinkSync(`${dirPath}/renamed.txt`)