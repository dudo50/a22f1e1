import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    name:{type:String, required:true, unique:false, trim:true},
    developer:{type:String, required:true, unique:false, trim:true},
    description:{type:String, required:true, unique:false, trim:true}
})

const GamMdl = mongoose.model("game", gameSchema)

export default GamMdl
