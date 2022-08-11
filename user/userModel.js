const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define('users',{
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },password:{
        type: Sequelize.STRING,
        allowNull: false
    }   
})
//Criar tabela
//false: se existir a tabela não cria.
//true: cria a tabela mesmo se ela já existir.
// User.sync({force: false})
module.exports = User;