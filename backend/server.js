const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();

app.use(express.static('public'));
//limiting image size to 50mb
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

const UserRouter = require("./routes/userrouter");
const PostRouter = require("./routes/postrouter");
const UploadRoute = require("./routes/UploadRoute");

//to images for public
app.use(express.static('public'))
app.use('/images', express.static('images'));

//getting the database url
const URL = process.env.MONGODB_URL;

//connect to database url with the given options
mongoose.connect(URL, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
})

//database connection
const connection = mongoose.connection;
connection.once("open", function () {
    console.log("db connection success");
});

app.get("/",(req,res)=>{
    res.json("server start")
})

//when http://localhost:8070/user ran it will execute userrouter.js file
app.use("/user", UserRouter);

//when http://localhost:8070/request ran it will execute postrouter.js file
app.use("/post",PostRouter);

//when http://localhost:8070/request ran it will execute UploadRoute.js file
app.use("/upload",UploadRoute);

//defining a port to run the application
//use port 8070 or use any other port if the 8070 is unavailable 
const PORT = process.env.PORT || 8080;

//running the app in previously defined port
const server = app.listen(PORT, () => {
    console.log(`Server is up and running on: ${PORT}`);
})

// const server = http.createServer(process.env.PORT || 3000);

//if the server crashed show it simply and stop the server
process.on("unhandledRejection", (error, promise) => {
    console.log(`Logged error: ${error}`);
    server.close(() => process.exit(1));
})
