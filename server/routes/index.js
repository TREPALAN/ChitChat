const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "Hello from Alan!" });
});

router.get("/about", (req, res) => {
    res.json({ message: "About page" });
})

module.exports = router;