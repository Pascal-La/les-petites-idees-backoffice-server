const mongoose = require("mongoose");

const ideaModel = mongoose.Schema(
  {
    logo: {
      type: String,
      default:
        "https://cdn-icons.flaticon.com/png/512/186/premium/186225.png?token=exp=1646216368~hmac=ea11b331590702874095a62e5628a164",
    },
    name: { type: String, required: true, unique: true },
    webSite: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    tags: { type: String },
    access: { type: String, required: true },
    language: { type: String, required: true },
    star: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const Idea = mongoose.model("Idea", ideaModel);

module.exports = Idea;
