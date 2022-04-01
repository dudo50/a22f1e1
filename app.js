const express = require( 'express' )
const connectDB = require ("./db/connectdb.js");
const web = require ("./routes/web.js");
const bodyParser = require ('body-parser');
const cors = require ('cors');

const app = express()

app.use('/uploads', express.static('uploads'));
app.use(cors());

const port = process.env.PORT || '8000'
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const DATABASE_URL = process.env.DATABASE_URL || "mongodb+srv://dudo:heslo123@mtaa.nptmr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
connectDB(DATABASE_URL);
app.use(express.json())

app.use("/api", web)

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})

