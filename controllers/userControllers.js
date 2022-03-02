const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

//* ========================= REGISTER USER =========================

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        token: jwt.sign(
          {
            _id: user._id,
            email: user.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        ),
      });
    } else throw new Error("La création de compte a échouée.");
  } catch (error) {
    res.status(400);
    throw new Error("La création de compte a échouée.");
  }
};

//* ========================= LOGIN USER =========================

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      email,
    });

    if (!user) errors.email = "Compte introuvable";

    if (password.trim() === "")
      throw new Error("Le mot de passe ne doit pas être vide");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("Mot de passe incorrect.");

    if (user && validPassword) {
      res.status(200).json({
        _id: user._id,
        email: user.email,
        token: jwt.sign(
          {
            _id: user._id,
            email: user.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        ),
      });
    } else throw new Error("La connexion a échouée.");
  } catch {
    res.status(400);
    throw new Error("La connexion a échouée.");
  }
};

module.exports = { registerUser, loginUser };
