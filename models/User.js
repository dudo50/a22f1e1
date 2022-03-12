import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type:String, required:true, unique:true, trim:true},
    email:{type:String, required:true, unique:true, trim:true},
})

const UsrMdl = mongoose.model("user", userSchema)

export default UsrMdl