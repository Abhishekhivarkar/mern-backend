import multer from "multer"

export const upload = multer({
    storage:multer.memoryStorage(),

    limits:{
        fileSize:5 * 1024 * 1024
    },

    fileFilter:(req,file,cb) =>{
        const allowedMimeType = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp"
        ]

        if(!allowedMimeType.includes(file.mimetype)){
            return cb(new Error("Invalid file type"))
        }

        cb(null,true)
    }
})