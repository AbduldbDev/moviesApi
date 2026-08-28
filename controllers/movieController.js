const Movie = require("../models/Movie");
const bcrypt = require("bcryptjs");
const auth = require("../auth");
const { errorHandler } = require("../auth");

module.exports.addMovie = (req, res) => {
  const { title, director, year, description, genre } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).send({
      message: "Title is required",
    });
  }
  if (!director || typeof director !== "string" || director.trim() === "") {
    return res.status(400).send({
      message: "Director is required",
    });
  }
  if (!year || typeof year !== "number") {
    return res.status(400).send({
      message: "Year is required",
    });
  }
  if (
    !description ||
    typeof description !== "string" ||
    description.trim() === ""
  ) {
    return res.status(400).send({
      message: "Description is required",
    });
  }
  if (!genre || typeof genre !== "string" || genre.trim() === "") {
    return res.status(400).send({
      message: "Genre is required",
    });
  }

  let newMovie = new Movie({
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    description: req.body.description,
    genre: req.body.genre,
  });

  return newMovie
    .save()
    .then((movie) => {
      return res.status(201).send(movie);
    })
    .catch((err) => errorHandler(err, req, res));
};

module.exports.getMovies = (req, res) => {
  return Movie.find({})
    .then((movies) => {
      return res.status(200).send({
        movies,
      });
    })
    .catch((err) => errorHandler(err, req, res));
};

module.exports.getMovie = (req, res) => {
  return Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        return res.status(404).send({
          message: "Movie not found",
        });
      }
      return res.status(200).send(movie);
    })
    .catch((err) => errorHandler(err, req, res));
};
