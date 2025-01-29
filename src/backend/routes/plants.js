const express = require("express");
const router = express.Router();
const plants = require("../data/plants.json"); // Assuming you have a JSON file with plant data

router.get("/", (req, res) => {
  res.json(plants);
});

module.exports = router;
