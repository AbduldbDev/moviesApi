const User = require("../models/User");
const bcrypt = require("bcryptjs");
const auth = require("../auth");
const { errorHandler } = require("../auth");

module.exports.registerUser = (req, res) => {
  if (!req.body.email.includes("@")) {
    return res.status(400).send({
      message: "Email invalid",
    });
  }

  if (req.body.password.length < 8) {
    return res.status(400).send({
      message: "Password must be at least 8 characters",
    });
  }

  let newUser = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  });

  return newUser
    .save()
    .then((user) => {
      return res.status(201).send({
        message: "Registered successfully",
      });
    })
    .catch((err) => errorHandler(err, req, res));
};

module.exports.loginUser = (req, res) => {
  if (!req.body.email.includes("@")) {
    return res.status(400).send({ message: "Invalid Email" });
  }

  return User.findOne({ email: req.body.email })
    .then((result) => {
      if (!result) {
        return res.status(404).send({ message: "No email found" });
      }

      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        result.password,
      );

      if (!isPasswordCorrect) {
        return res
          .status(401)
          .send({ message: "Email and password do not match" });
      }

      return res.status(200).send({
        access: auth.createAccessToken(result),
      });
    })
    .catch((err) => errorHandler(err, req, res));
};

module.exports.details = (req, res) => {
  return User.findById(req.user.id)
    .select("-password")
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found",
        });
      }

      return res.status(200).send(user);
    })
    .catch((err) => errorHandler(err, req, res));
};
