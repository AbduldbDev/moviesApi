const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { verify, verifyAdmin } = require("../auth");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/details", verify, userController.details);

module.exports = router;
