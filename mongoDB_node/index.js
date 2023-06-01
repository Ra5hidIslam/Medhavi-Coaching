const express  = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet  = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
cors = require("cors");


const userRoutes =  require("./Routes/user");
const authRoutes =  require("./Routes/auth");
const feedRoutes =   require("./Routes/feed");
const refreshRoute = require("./Routes/refresh");
const logoutRoute = require("./Routes/logout");



dotenv.config();



mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser:true,useUnifiedTopology:true },
).then(()=>{
    console.log("Connected to mongo successfully")
});

const corsOptions = {
    origin:"http://localhost:3000"
}


// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/user",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/feed",feedRoutes);
app.use("/api/refresh",refreshRoute);
app.use("/api/logout",logoutRoute);

app.listen(8800,()=>{
    console.log("Backend server is running");
});