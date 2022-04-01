const mongoose = require ('mongoose');
const dotenv = require('dotenv').config()
const connectDB = async (DATABASE_URL) => {
    try {
        const DB_OPTIONS = {
            dbName: 'mtaa',
        }
        await mongoose.connect(DATABASE_URL, DB_OPTIONS);

        console.log('Connected Successfully..');
    } catch (err) { 
        console.log(err);
    }
}

module.exports = connectDB