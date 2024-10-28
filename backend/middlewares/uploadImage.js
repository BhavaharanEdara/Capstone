const multer = require('multer');

const path = require('path');
const fs = require('fs');
const { cloudinaryUploadImg } = require('../utils/cloudinary');

const uploadDir = path.join(__dirname, '../public/uploads');
    if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    }

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.originalname + '-' + uniqueSuffix + path.extname(file.originalname)); 
    }
});

const uploadImages = async (req,res,next)=>{

    try{
        
        const uploader = async(path)=>{
            return await cloudinaryUploadImg(path, "images");
        }
        const urls = [];
        const files = req.files;
        for(const file of files){
            const filePath = file.path;
            const newPath = await uploader(filePath);
            urls.push(newPath);
            fs.unlinkSync(filePath);
        }
        const images = urls.map((file)=>{return file;});
        req.files = images;
        next();

    }
    catch(error){
        res.status(400).json({message:"Failed to load images"})
    }
}


const upload = multer({ storage: storage });

module.exports = {upload, uploadImages}