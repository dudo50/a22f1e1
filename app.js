import express from 'express'
import connectDB from "./db/connectdb.js";
import web from "./routes/web.js";
import bodyParser from "body-parser"
const app = express()

const port = process.env.PORT || '8000'
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017";
connectDB(DATABASE_URL);
app.use(express.json())

app.use("/api", web)

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})

