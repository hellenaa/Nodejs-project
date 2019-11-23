const multer  = require('multer');  //module for form data treating
const crypto = require('crypto');  //generate random file names
const path = require('path');  //module for working with path , esp getting the extname


exports.upload =  multer({
        storage: multer.diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                let customFileName = crypto.randomBytes(18).toString('hex'); //generate random file name
                let fileExtension = path.extname(file.originalname); // get file extension from original file name
                cb(null, customFileName + fileExtension)
            }
        })
    }).single('file');
