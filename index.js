const { render } = require("ejs");
const express = require("express");
const bodyParse = require("body-parser")
const conexao = require("./database/database")
const app = express();

conexao.authenticate().then(()=>{
    console.log("conexão feita com o banco de dados!")
}).catch((msgErro)=>{
    console.log(msgErro)
})

app.set('view engine','ejs')
app.use(express.static('public'))

app.use(bodyParse.urlencoded({extended:false}))
app.use(bodyParse.json())

app.get("/",(req,res)=>{
    res.render('index')
})
app.get("/perguntar",(req,res)=>{
    res.render("perguntar")
})
app.post("/salvarpergunta",(req,res)=>{
    let titulo = req.body.titulo
    let descricao = req.body.descricao
    res.send(`Esse é o titulo = ${titulo} e essa é a descrica = ${descricao}`)
})

app.listen(8080,(erro)=>{
    if(erro){
        console.log("Houve um erro")
    }else{
        console.log('O Servidor está funcionando')
    }
})