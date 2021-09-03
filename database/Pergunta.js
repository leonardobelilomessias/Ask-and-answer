const Sequelize = require('sequelize');
const conexao = require('./database');

const Pergunta = conexao.define('pergunta',{
    titulo:{
        type:Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull:false
    }
});

Pergunta.sync({force:false}).then(()=>{})
