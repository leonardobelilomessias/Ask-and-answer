const { render } = require("ejs");
const express = require("express");
const app = express();

app.set('view engine','ejs')
app.use(express.static('public'))

app.get("/",(req,res)=>{
    res.render('index')
})
app.get("/perguntar",(req,res)=>{
    res.render("perguntar")
})
app.post("/salvarpergunta",(req,res)=>{
    let resposta = req.body
    res.send(resposta)
})
app.listen(8080,(erro)=>{
    if(erro){
        console.log("Houve um erro")
    }else{
        console.log('O Servidor está funcionando')
    }
})