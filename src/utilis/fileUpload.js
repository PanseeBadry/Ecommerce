import mongoose from "mongoose"
import { appError } from "./appError.js"
import multer from "multer"

const uploadFile = ()=>{
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads')
        },
        filename: function (req, file, cb) {
          cb(null,new mongoose.Types.ObjectId +'_' + file.originalname )
        }

      })


      function fileFilter (req, file, cb) {

        // The function should call `cb` with a boolean
        // to indicate if the file should be accepted
      if(file.mimetype.startsWith("image")){
        cb(null, true)
      }else{
        cb(new appError("invalid image type",401), false)
      }
        // To reject this file pass `false`, like so:
        
      
        // To accept the file pass `true`, like so:
       
    
      
    }
      
      const upload = multer({ storage ,fileFilter})
      return upload;
}



export const uploadSingle= (fieldName)=>uploadFile().single(fieldName)
export const uploadArray= (fieldName)=>uploadFile().array(fieldName,10)
export const uploadfields= (fieldName)=>uploadFile().fields(fieldName)