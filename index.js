const express = require("express");
const app = express();

app.set('view engine','ejs')
app.get("/",(req,res)=>{
    res.render('index')
})

app.listen(8080,(erro)=>{
    if(erro){
        console.log("Houve um erro")
    }else{
        console.log('O Servidor está funcionando')
    }
})