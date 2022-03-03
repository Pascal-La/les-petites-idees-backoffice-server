const Idea = require("../models/ideaModel");

//* ======================= GET ALL IDEAS =======================

const getAllIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.status(200).json(ideas);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

//* ======================= CREATE IDEA =======================

const addNewIdea = async (req, res) => {
  const { logo, name, webSite, description, tags, access, language, star } =
    req.body;

  try {
    const nameExists = await Idea.findOne({ name });
    if (nameExists) {
      res.status(400);
      throw new Error("Ce nom d'idée existe déjà!");
    }

    const webSiteExists = await Idea.findOne({ webSite });
    if (webSiteExists) {
      res.status(400);
      throw new Error("Ce site existe déjà!");
    }

    if (!name || !webSite || !description || !access || !language || !star) {
      res.status(400);
      throw new Error("Tous les champs sont requis!");
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
    } else throw new Error("L'ajout de l'idée a échoué!");
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

//* ======================= UPDATE IDEA =======================

//* ======================= DELETE IDEA =======================

module.exports = { getAllIdeas, addNewIdea };
