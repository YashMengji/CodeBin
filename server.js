const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const favicon = require('serve-favicon');
const documentModel = require("./models/Document.js");
require('dotenv').config()

const app = express();
app.set("view engine", "ejs");
// Serve the favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); //we are including this to resolve an unsolved error on command of chatGPT
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));


mongoose.connect(`mongodb+srv://yash:${process.env.MONGO_PASS}@cluster0.jia8s2u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/backend_learn`);

app.get("/", (req, res) => {
  const code = `Welcome to codeBin!
Hi this is yash. 
  `
  res.render("code_display", {code, language: "plaintext"});
});

app.get("/new", (req, res) => {
  res.render("new", {canSave: true});
});

app.post("/save", async (req, res) => {
  const textInput = req.body.textInput;
  try{
    const document = await documentModel.create({textInput});
    res.redirect(`/${document._id}`)
  } catch(e) {
    res.render("new", {textInput, canSave: true})
  }
});

app.get("/:documentId", async (req, res) => {
  const documentId = req.params.documentId;
  const document = await documentModel.findOne({_id: documentId});
  res.render("code_display", {code: document.textInput, id: documentId});
});

app.get("/duplicate/:documentId", async (req, res) => {
  const documentId = req.params.documentId;
  const document = await documentModel.findOne({_id: documentId});
  const textInput = document.textInput;
  res.render("new", {textInput, canSave: true});
});

app.listen(process.env.PORT || 3000);