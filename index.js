const { render } = require("ejs");
const express = require("express");
const bodyParse = require("body-parser")
const conexao = require("./database/database")
const app = express();
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

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
    Pergunta.findAll({raw:true,order:[['id','DESC']]}).then(perguntas =>{
        res.render("index",{
            perguntas:perguntas
        })
    })
    
})
app.get("/pergunta/:id",(req,res)=>{
    let id = req.params.id
    Pergunta.findOne({
        where:{id:id}
    }).then((pergunta)=>{
        

        if(pergunta != undefined){
             
            Resposta.findAll({
                where:{ perguntaId: pergunta.id},
                order:[['id','DESC']]
            }).then((respostas)=>{
                res.render("pergunta",{pergunta:pergunta,respostas:respostas});
            })

            
        }else{
            res.redirect("/")
        }
    })
});

app.get("/perguntar",(req,res)=>{
    res.render("perguntar")
})

app.post("/salvarpergunta",(req,res)=>{
    let titulo = req.body.titulo
    let descricao = req.body.descricao
    Pergunta.create({
        titulo: titulo,
        descricao:descricao
    }).then(()=>{
        res.redirect("/");
    })
    
})

app.post("/responder",(req,res)=>{
    let corpo = req.body.corpo
    let perguntaId = req.body.perguntaId
    Resposta.create({
        corpo:corpo,
        perguntaId:perguntaId
    })
    res.redirect(`/pergunta/${perguntaId}`)
})

app.listen(8080,(erro)=>{
    if(erro){
        console.log("Houve um erro")
    }else{
        console.log('O Servidor está funcionando')
    }
})