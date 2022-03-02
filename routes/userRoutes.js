const express = require("express");

const router = express.Router();

const { registerUser, loginUser } = require("../controllers/userControllers");
const { protected } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
