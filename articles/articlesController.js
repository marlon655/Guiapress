const express = require("express");
const router = express.Router();
const Category = require("../categories/category");
const Article = require("./article");
const slugify = require("slugify");

router.get("/artigos",(req,res)=>{
    res.send("Artigos");
});

router.get("/admin/articles",(req,res)=>{
    Article.findAll({
        include: [{model: Category}]
    }
    ).then(articles => {
        res.render("admin/articles",{articles: articles});
    });

});

router.get("/admin/articles/new", (req, res) =>{
    Category.findAll().then((categories) => {
        res.render("admin/articles/new",{categories: categories});
    });
});
router.post("/articles/save",(req, res) => {
    let title = req.body.title;
    let body = req.body.body;
    let category = req.body.category;

    Article.create({
        title:title,
        slug:slugify(title),
        body: body,
        categoryId: category
    }).then(() => {
        res.redirect("/admin/articles");
    });
});

router.post("/articles/delete",(req, res)=>{
    let id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Article.destroy({
                where:{
                    id:id
                }
            }).then(()=>{
                res.redirect("/admin/articles");
            })
        }else{
            res.redirect("/admin/articles");
        }
    }else{
        res.redirect("/admin/articles");
    }
})

router.get("/admin/articles/edit/:id", (req, res) => {
    let id = req.params.id;
    Article.findByPk(id).then(article =>{
        if(article != undefined){

            Category.findAll().then((categories) =>{
                res.render("admin/articles/edit",{categories: categories, article:article})
            })

        }else{
            res.redirect("/");
        }
    }).catch(err =>{
        res.redirect("/");
    })
})
router.post("/articles/update",(req, res)=>{
    let id = req.body.id;
    let title = req.body.title;
    let body = req.body.body;
    let category = req.body.category;

    Article.update({title: title, body: body, categoryId: category, slug: slugify(title)},{
        where:{
            id:id
        }
    }).then(()=>{
        res.redirect("/admin/articles");
    }).catch(err => {
        res.redirect("/admin/articles");
    });
});

router.get("/articles/page/:num",(req, res)=>{
    let page = req.params.num;
    let offset = 0;

    if(isNaN(page) || page == 1){

        offset = 0;
    }else{
        offset = (parseInt(page) - 1) * 3;
    }

    Article.findAndCountAll({
        limit:3,
        offset: offset,
        order:[
            ['id','DESC']
        ]
    }).then((articles)=>{
        // count quantidade de elementos
        // rows lista de artigos
        let next;
        if(offset + 3 >= articles.count){
            next = false;
        }else{
            next = true;
        }
        let result ={
            page: parseInt(page),
            next: next,
            articles: articles
        }

        Category.findAll().then(categories =>{
            res.render("admin/articles/page",{
                result: result,
                categories:categories
            });
        })
        // res.json(result);
    })
});
module.exports = router;