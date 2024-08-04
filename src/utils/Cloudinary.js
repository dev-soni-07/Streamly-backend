import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        // Upload file on Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })
        // File has been uploaded successfully
        // console.log("File has been uploaded successfully on cloudinary", response, response.url)
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        // console.log("Error in uploading file on cloudinary", error);
        fs.unlinkSync(localFilePath) // Remove file from local storage / server which was temporarily saved
        return null;
    }
}

export { uploadOnCloudinary }