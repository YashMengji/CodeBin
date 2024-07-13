const express = require("express");
const mongoose = require("mongoose");
const documentModel = require("./models/Document.js");
require('dotenv').config()

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

mongoose.connect(`mongodb+srv://yash:${process.env.MONGO_PASS}@cluster0.jia8s2u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/backend_learn`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.get("/", (req, res) => {
  const code = `Welcome to codeBin!
Hi this is yash. 
  `
  res.render("code_display", {code, language: "plaintext"});
});

app.get("/new", (req, res) => {
  
  res.render("new");
});

app.post("/save", async (req, res) => {
  const textInput = req.body.textInput;
  try{
    const document = await documentModel.create({textInput});
    res.redirect(`/${document.id}`)
  } catch(e) {
    res.render("new", {textInput})
  }
});

app.get("/:documentId", async (req, res) => {
  const documentId = req.params.documentId;
  const document = await documentModel.findOne({_id: documentId});
  res.render("code_display", {code: document.textInput, id: documentId});
});

app.listen(process.env.PORT || 3000);