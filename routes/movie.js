const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movieController");
const { verify, verifyAdmin } = require("../auth");

router.post("/addMovie", verify, verifyAdmin, movieController.addMovie);
router.get("/getMovies", movieController.getMovies);
router.get("/getMovie/:movieId", movieController.getMovie);

module.exports = router;
