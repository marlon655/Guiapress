//bibliotecas
const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const connection = require("./database/database");
//Importar Controllers
const categoriesController = require("./categories/categoriesController");
const articlesController = require("./articles/articlesController");
const usersController = require("./user/usersController");
//Executar Models
const article = require("./articles/article");
const category = require("./categories/category");
const User = require("./user/userModel");
//Sessions
app.use(session({
    secret: "456123789", cookie: { maxAge: 3000000 }
}))

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

//Usar Controllers
app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/",usersController);

//routes
app.get("/",(req, res)=>{
    article.findAll({
        order:[
            ['id','DESC']
        ],
        limit: 3
    }).then(articles => {
        category.findAll().then(categories => {
            res.render('index',{articles: articles, categories:categories});
        })
    })
});

app.get("/:slug",(req, res)=>{
    let slug = req.params.slug;
    article.findOne({
        where:{
            slug: slug
        }
    }).then(article =>{
        if(article != undefined){
            category.findAll().then(categories => {
                res.render('article',{article: article, categories:categories});
            });
        }else{
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    });
});

app.get("/category/:slug", (req,res) => {
    let slug = req.params.slug;
    category.findOne({
        where:{
            slug: slug
        },
        include: [{model: article}]
    }).then( categorie => {
        if(categorie != undefined){
            category.findAll().then(categories => {
                res.render("index",{articles: categorie.articles, categories: categories});
            });
        }else{
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    })
})
app.listen(8080,()=>{
    console.log("Servidor Online!");
});

