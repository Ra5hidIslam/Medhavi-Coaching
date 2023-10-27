const express  = require("express");
const app = express();
const mongoose = require("mongoose");
// const dotenv = require("dotenv");
require('dotenv').config()
const helmet  = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
cors = require("cors");


const userRoutes =  require("./Routes/user");
const authRoutes =  require("./Routes/auth");
const feedRoutes =   require("./Routes/feed");
const refreshRoute = require("./Routes/refresh");
const logoutRoute = require("./Routes/logout");
const postRoute = require("./Routes/post");
const commentRoute = require("./Routes/comments");
const notesRoute = require("./Routes/notes")


// dotenv.config();

// console.log(process.env);


mongoose.connect(process.env.REACT_APP_MONGO_URL,
    { useNewUrlParser:true,useUnifiedTopology:true },
).then(()=>{
    console.log("Connected to mongo successfully")
});

const corsOptions = {
    origin:process.env.REACT_APP_API_URL_ORIGIN_DOMAIN,
    origin:process.env.REACT_APP_API_URL_ORIGIN,
    credentials:true,
}


// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", env.REACT_APP_API_URL_ORIGIN); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });





app.use("/api/user",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/feed",feedRoutes);
app.use("/api/refresh",refreshRoute);
app.use("/api/logout",logoutRoute);
app.use("/api/post/",postRoute);
app.use("/api/comment",commentRoute);
app.use("api/notes/",notesRoute);
app.use(express.static('files'));

app.listen(8800,()=>{
    console.log("Backend server is running");
});
