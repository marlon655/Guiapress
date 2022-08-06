const Sequelize = require("sequelize");
const connection = new Sequelize('guiapress','root','ma233244',{
    host:'localhost',
    dialect:'mysql'
});

module.exports = connection;