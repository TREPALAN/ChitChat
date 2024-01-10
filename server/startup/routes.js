const express = require("express");
const indexRoute = require("../routes/index");


module.exports = (app) => {
    app.use("/", indexRoute);
}

