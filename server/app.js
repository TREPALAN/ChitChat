const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const logger = require("morgan");

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}

// Start server
corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
require("./startup/routes")(app);

const server = http.createServer(app); // creates a server
const io = new Server(server, {
  cors: corsOptions,
});

// Socket.io
require("./socket.io/socket")(io);

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
