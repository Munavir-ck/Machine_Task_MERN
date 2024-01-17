import fs from 'fs'


export function convertImagePathToBase64(imagePath) {
    // Read the image file
    const imageData = fs.readFileSync(imagePath);
  
    // Convert the image data to a Base64 string
    const base64String = imageData.toString('base64');
  
    return base64String;
  }

