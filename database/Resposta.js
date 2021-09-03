const Sequelize = require('sequelize');
const conexao = require('./database');
const Resposta = conexao.define("resposta",{
    corpo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    perguntaId:{
        type: Sequelize.INTEGER,
        allowNull: true,
    }
})
Resposta.sync({force:false})

module.exports = Resposta