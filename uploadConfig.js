//import
const multer = require("multer");

const options = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/images/");
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + "_" + file.originalname);
    }
});

const upload = multer({storage: options}).single("fileUpload");

module.exports = upload;