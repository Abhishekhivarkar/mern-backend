import cloudinary from "../../configs/cloudinary.js";

export const uploadToCloudinary = (
  buffer: Buffer,
  folder: string,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          resolve(result);
        },
      )
      .end(buffer);
  });
};
