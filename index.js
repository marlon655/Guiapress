const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
//controllers
const categoriesController = require("./categories/categoriesController");
const articlesController = require("./articles/articlesController");
//models
const article = require("./articles/article");
const category = require("./categories/category");

app.set('view engine','ejs');//view engine
app.use(express.static('public'));//images,arquivos...
app.use(bodyParser.urlencoded({extended: false}));//dados de formularios
app.use(bodyParser.json());//dados json

//Conect to Database
connection
    .authenticate()
    .then(()=>{
        console.log("successfully connected!");
    }).catch((error)=>{
        console.log(error);
    })

app.use("/", categoriesController);
app.use("/", articlesController);
//routes
app.get("/",(req, res)=>{
    res.render('index');
});

app.listen(8080,()=>{
    console.log("Servidor Online!");
});

