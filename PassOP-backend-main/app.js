require("dotenv").config()

const express = require("express")
const app = express()
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors")
const ConnectDb = require('./config/dbConn')
const passwordRoutes = require("./routes/passwordRoutes")
const authRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");

app.set("trust proxy", true);

ConnectDb()

app.use((req, res, next) => {
  console.log("req.ip:", req.ip);
  console.log("x-forwarded-for:", req.headers["x-forwarded-for"]);
  next();
});

app.use(helmet());
app.use(express.json())
app.use(cors());
app.use(compression());
app.use("/api/auth", authRoutes);
app.use("/api/passwords", passwordRoutes);
app.use(errorHandler);



app.listen(process.env.PORT || 4040)
