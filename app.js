import express from 'express'
import connectDB from "./db/connectdb.js";
import web from "./routes/web.js";
import bodyParser from "body-parser";
import multer from 'multer';
const app = express()

const port = process.env.PORT || '8000'
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017";
connectDB(DATABASE_URL);
app.use(express.json())

app.use(function () {multer({dest: './uploads/', rename: function (fieldname, filename) {return filename;},})});
app.post('/api/photo', function (req, res) {
    // toto asi hodit do userController do updateData
    // spravene podla https://medium.com/@alvenw/how-to-store-images-to-mongodb-with-node-js-fb3905c37e6d
    var newItem = new Item();
    newItem.img.data = fs.readFileSync(req.files.userPhoto.path);
    newItem.img.contentType = 'image/png';
    newItem.save();
});
app.use("/api", web)

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})

