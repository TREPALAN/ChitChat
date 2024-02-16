const express = require("express");
const cors = require("cors");
const app = express();

//  Allowed origins
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}

//
app.use(cors(corsOptions));
app.use(express.json());
require("./startup/routes")(app);

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
