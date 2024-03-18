import { handleError } from "../../middleware/handleAsyncError.js"

    export const deleteOne = (model)=>{
        return handleError(async(req,res)=>{
            let deleted= await model.findByIdAndDelete(req.params.id)
            deleted && res.json({message:"done",deleted})
            !deleted && res.json({message:"item not found"})
        })
    }