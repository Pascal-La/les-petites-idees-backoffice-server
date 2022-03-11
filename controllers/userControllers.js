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

  try {
    const user = await User.findOne({
      email,
    });

    if (!user) console.log("Compte introuvable");

    if (password.trim() === "")
      console.log("Le mot de passe ne doit pas être vide");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) console.log("Mot de passe incorrect.");

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
    } else console.log("La connexion au compte a échouée.");
  } catch {
    console.log("Connexion au compte impossible.");
    res.status(400);
  }
};

module.exports = { registerUser, loginUser };
