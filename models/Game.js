import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    game_id:{type:String, required:true, unique:true, trim:true},
    name:{type:String, required:true, unique:false, trim:true},
    developer:{type:String, required:true, unique:false, trim:true},
    description:{type:String, required:true, unique:false, trim:true},
    published:{type:String, required:true, unique:false, trim:true},
})

const GamMdl = mongoose.model("game", gameSchema)

export default GamMdl

/*
NOTE: Getting date from database:

now = new Date('03.13.2021'); // Must be MM.DD.YYYY
console.log(now);
console.log("Year: " + now.getFullYear());
console.log("Month: " + (now.getMonth() + 1));
console.log("Day: " + now.getDate());
*/
