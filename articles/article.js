const Sequelize = require("sequelize");
const connection = require("../database/database");
const category = require("../categories/category");

const article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

category.hasMany(article);//uma categoria tem muitos artigos
article.belongsTo(category);//um artigo pertence a uma categoria

// article.sync({force: true});
module.exports = article;