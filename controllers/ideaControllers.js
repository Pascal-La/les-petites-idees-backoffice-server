const Idea = require("../models/ideaModel");

//* ======================= GET ALL IDEAS =======================

const getAllIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.status(200).json(ideas);
  } catch (error) {
    console.log("La récupération des idées a échouée.");
    res.status(400);
  }
};

//* =======================  QUERY IDEAS =======================

const searchIdeas = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { webSite: { $regex: req.query.search, $options: "i" } },
          { description: { $regex: req.query.search, $options: "i" } },
          { tags: { $regex: req.query.search, $options: "i" } },
          { access: { $regex: req.query.search, $options: "i" } },
          { language: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const ideas = await Idea.find(keyword);
  res.send(ideas);
};

//* ======================= GET ONE IDEA ======================

const getOneIdea = async (req, res) => {
  const ideaId = req.params.id;

  try {
    const idea = await Idea.findOne({ _id: ideaId });
    res.status(200).json(idea);
  } catch (error) {
    console.log("La récupération de l'idée a échouée.");
    res.status(400);
  }
};

//* ======================= CREATE IDEA =======================

const addNewIdea = async (req, res) => {
  const { logo, name, webSite, description, tags, access, language, star } =
    req.body;

  try {
    const nameExists = await Idea.findOne({ name });
    if (nameExists) {
      console.log("Ce nom existe déjà!");
      return res.sendStatus(400);
    }

    const webSiteExists = await Idea.findOne({ webSite });
    if (webSiteExists) {
      console.log("Ce site existe déjà!");
      return res.sendStatus(400);
    }

    if (
      !name ||
      name.trim() === "" ||
      !webSite ||
      webSite.trim() === "" ||
      !description ||
      description.trim() === "" ||
      tags.length === 0 ||
      access.length === 0 ||
      language.length === 0
    ) {
      console.log("Tous les champs sont requis!");
      return res.sendStatus(400);
    }

    const idea = await Idea.create({
      logo,
      name,
      webSite,
      description,
      tags,
      access,
      language,
      star,
    });

    if (idea) {
      res.status(201).json({
        _id: idea._id,
        logo: idea.logo,
        name: idea.name,
        webSite: idea.webSite,
        description: idea.description,
        tags: idea.tags,
        access: idea.access,
        language: idea.language,
        star: idea.star,
      });
    } else console.log("La création de l'idée a échouée.");
  } catch (error) {
    console.log("Création de l'idée impossible.");
    res.status(400);
  }
};

//* ======================= UPDATE IDEA =======================

const updateIdea = async (req, res) => {
  const { logo, name, webSite, description, tags, access, language, star } =
    req.body;
  const ideaId = req.params.id;

  if (
    !name ||
    name.trim() === "" ||
    !webSite ||
    webSite.trim() === "" ||
    !description ||
    description.trim() === "" ||
    tags.length === 0 ||
    access.length === 0 ||
    language.length === 0
  ) {
    console.log("Tous les champs sont requis!");
    res.status(400);
  }

  try {
    const updateIdea = await Idea.findByIdAndUpdate(
      { _id: ideaId },
      {
        logo,
        name,
        webSite,
        description,
        tags,
        access,
        language,
        star,
      },
      { new: true }
    );

    if (updateIdea) {
      res.status(201).json({
        _id: updateIdea,
        logo: updateIdea.logo,
        name: updateIdea.name,
        webSite: updateIdea.webSite,
        description: updateIdea.description,
        tags: updateIdea.tags,
        access: updateIdea.access,
        language: updateIdea.language,
        star: updateIdea.star,
      });
    } else res.status(400).json(error.message);
  } catch (error) {
    console.log("La modification de l'idée a échouée.");
    res.status(400);
  }
};

//* ======================= DELETE IDEA =======================

const deleteIdea = async (req, res) => {
  Idea.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: "Idée supprimé!" });
    })
    .catch((error) => res.status(400).json(error.message));
};

module.exports = {
  getAllIdeas,
  getOneIdea,
  addNewIdea,
  updateIdea,
  deleteIdea,
  searchIdeas,
};
