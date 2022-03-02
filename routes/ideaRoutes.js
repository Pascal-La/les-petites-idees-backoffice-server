const express = require("express");

const router = express.Router();

const { getAllIdeas, addNewIdea } = require("../controllers/ideaControllers");

router.get("/getAllIdeas", getAllIdeas);
router.post("/addNewIdea", addNewIdea);

module.exports = router;
