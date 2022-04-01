const mongoose = require ('mongoose');
const dotenv = require('dotenv').config()
const connectDB = async (DATABASE_URL) => {
    try {
        const DB_OPTIONS = {
            dbName: 'mtaa',
        }
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/game-browser-application');
        console.log('Connected Successfully..');
    } catch (err) { 
        console.log(err);
    }
}

module.exports = connectDB