const express  = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet  = require("helmet");
const morgan = require("morgan");
const userRoutes =  require("./Routes/user")
const authRoutes =  require("./Routes/auth")
const feedRoutes =   require("./Routes/feed")

dotenv.config();



mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser:true,useUnifiedTopology:true },
).then(()=>{
    console.log("Connected to mongo successfully")
});


// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


app.use("/api/user",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/feed",feedRoutes);


app.listen(8800,()=>{
    console.log("Backend server is running");
});