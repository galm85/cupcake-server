const multer = require("multer")
const path = require("path");



module.exports = multer({
    storage:multer.diskStorage({}),
    fileFilter:(req,file,cb)=>{
        let ext = path.extname(file.originalname);
        if(ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png"){
            cb(new Error("File type wrong"),false);
            return;
        }

        cb(null,true);
    }
})


module.exports.cvFile = multer({
    storage:multer.diskStorage({}),
    fileFilter:(req,file,cb)=>{
        let ext = path.extname(file.originalname);
       
        // if(ext !== ".doc" && ext !== ".docx" && ext !== ".png"){
        //     cb(new Error("CV File type wrong"),false);
        //     return;
        // }

        cb(null,true);
    }
})
