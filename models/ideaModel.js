const mongoose = require("mongoose");

const ideaModel = mongoose.Schema(
  {
    logo: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    name: { type: String, required: true, unique: true },
    webSite: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    tags: { type: [String] },
    access: { type: [String], required: true },
    language: { type: [String], required: true },
    star: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const Idea = mongoose.model("Idea", ideaModel);

module.exports = Idea;
