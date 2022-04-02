const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

//* ========================= REGISTER USER =========================

const registerUser = async (req, res) => {
  const { email, firstname, lastname, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      firstname,
      lastname,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        token: jwt.sign(
          {
            _id: user._id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        ),
      });
    } else console.log("La création de compte a échouée.");
  } catch (error) {
    console.log("Création de compte impossible.");
    res.status(400);
  }
};

//* ========================= LOGIN USER =========================

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  let validPassword = null;

  try {
    if (email.trim() === "")
      res.status(400).send("L'email ne doit pas être vide");

    if (password.trim() === "")
      res.status(400).send("Le mot de passe ne doit pas être vide");

    const user = await User.findOne({
      email,
    });

    if (!user) res.status(400).send("Compte introuvable");
    if (user) {
      validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) res.status(400).send("Mot de passe incorrect.");
    }

    if (user && validPassword) {
      res.status(200).json({
        _id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        token: jwt.sign(
          {
            _id: user._id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        ),
      });
    } else res.status(400).send("La connexion au compte a échoué.");
  } catch (error) {
    console.log("Connexion au compte impossible.");
    res.status(400);
  }
};

module.exports = { registerUser, loginUser };
