const sequelize = require("sequelize")
const conexao = new sequelize("guiaperguntas","root","",{
    host:'localhost',
    dialect:'mysql'
});
module.exports = conexao