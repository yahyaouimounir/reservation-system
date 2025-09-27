const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        role: req.body.role,
      });
      return user.save();
    })
    .then((user) => {
      res.status(201).json({
        message: "Utilisateur créé avec succès ",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: "user",
        },
      });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Login failed !" });
      }

      bcrypt.compare(req.body.password, user.password).then((valid) => {
        if (!valid) {
          return res.status(401).json({ error: "Login failed !" });
        }

        res.status(200).json({
          userId: user._id,
          token: jwt.sign(
            { userId: user._id, role: user.role },
            "RANDOM_TOKEN_SECRET",
            { expiresIn: "24h" }
          ),
        });
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.create = (req, res, next) => {
  const role =
    req.body.role && ["user", "admin"].includes(req.body.role)
      ? req.body.role
      : "user";

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        role: role,
      });
      return user.save();
    })
    .then((user) => {
      res.status(201).json({
        message: "Utilisateur créé avec succès par un admin",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    })
    .catch((error) => res.status(400).json({ error }));
};
