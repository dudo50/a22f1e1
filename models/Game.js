import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    game_id:{type:String, required:true, unique:true, trim:true},
    name:{type:String, required:true, unique:false, trim:true},
    picture:{type:String, required:true, default:"./assets/gamePic/default.jpg"},
    developer:{type:String, required:true, unique:false, trim:true},
    description:{type:String, required:true, unique:false, trim:true},
    published:{type:String, required:true, unique:false, trim:true},
    link:{type:String, required:false, unique:false, trim:true},
    status:{type:String, enum:['2D','3D','AUCTION','RPG','ARCADE','BASE BUILDING','SPORT','BATTLE ROYALE', 'BOARD GAME', 'BUILDING', 'CARD GAME','EXPLORATION','FARMING','HACKING','HIDDEN OBJECT','HORROR','MANAGEMENT','MINING','MMORPG','OPEN WORLD','PLATFORMER','SANDBOX','SHOOTER','STRATEGY RPG','SURVIVAL','TOWER DEFENCE','TURN BASED STRATEGY', 'WALKING SIMULATOR'], required:true},
    reviews: [{type:String, unique:true}],

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
