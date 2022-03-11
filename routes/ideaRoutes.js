const express = require("express");

const router = express.Router();

const {
  getAllIdeas,
  getOneIdea,
  addNewIdea,
  updateIdea,
  deleteIdea,
  searchIdeas,
} = require("../controllers/ideaControllers");
const { protected } = require("../middleware/authMiddleware");

router.get("/idealist", protected, getAllIdeas);
router.get("/searchideas", protected, searchIdeas);
router.get("/singleidea/:id", protected, getOneIdea);
router.post("/newidea", protected, addNewIdea);
router.put("/updateidea/:id", protected, updateIdea);
router.delete("/deleteidea/:id", protected, deleteIdea);

module.exports = router;
