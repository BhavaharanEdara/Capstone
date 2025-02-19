const cloudinary = require('cloudinary');


cloudinary.config({
    cloud_name:process.env.cloud_name,
    api_key:process.env.api_key,
    api_secret:process.env.api_secret
});

const cloudinaryUploadImg = async(fileToUpload)=>{
    return new Promise((resolve)=>{
        cloudinary.uploader.upload(fileToUpload,(result)=>{
            resolve(
                {
                    url:result.secure_url,          
                    asset_id: result.asset_id,
                    public_id: result.public_id,
          
                },
                {
                    resource_type:"raw"
                }
           );
        });
    });
};

const cloudinaryDeleteImg = async (fileToDelete) => {
    return new Promise((resolve) => {
      cloudinary.uploader.destroy(fileToDelete, (result) => {
        resolve(
          {
            url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id,
          },
          {
            resource_type: "auto",
          }
        );
      });
    });
  };
  

  module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg };