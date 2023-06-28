const express = require("express");
const app = express();
const dotenv = require("dotenv");
const router = require("./routes/book");
dotenv.config({ path: "./config.env" });
require("./dbConnect");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log("server started on port on", process.env.PORT);
});
