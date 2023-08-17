const fs = require("fs");
const createDirectory=(directoryName)=>{
    if(!fs.existsSync(directoryName))
        fs.mkdirSync(directoryName);
}

//Default Post Array
const defaultPost = `[{
    "id":"2023",
    "title":"nodejs",
    "url":"http://example.com",
    "description":"modern web development"
},]`
const createFile = (fileName)=>{
    if(!fs.existsSync(fileName))
        fs.writeFileSync(fileName,defaultPost);
}

module.exports={
    createDirectory,
    createFile
}