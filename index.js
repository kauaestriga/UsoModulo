const express = require("express")
const cliente = require("clientes-kaua-email-cpf")
const bodyParser = require("body-parser")
const jwt = require('jsonwebtoken')

const createUserToken = (userId)=>{
    return jwt.sign({id:userId},"navegacao",{expiresIn:'2d'})
}

const app = express()

app.use(bodyParser.json())

app.get("/",(req,res)=>{
    res.send({msg:"Rota raiz"})
})

app.get("/clientes", auth, (req,res)=>{
    res.send({msg:"Rota cliente"})
})

app.get("/contato",(req,res)=>{
    res.send({msg:"Rota contato"})
})

app.get("/admin", auth, (req,res)=>{
    res.send({rs:"Texto qualquer"})
})

app.post("/cadastro", (req,res)=>{
    res.send({token:createUserToken(req.body.id)})
})

app.post("/logar", (req,res)=>{
    res.send({token:createUserToken(req.body.id)})
})

function auth(req,res,next){
    const token_header = req.headers.auth
    
    if(!token_header) res.send({rs:"Não há token"})

    jwt.verify(token_header, "navegacao", (erro, dados)=>{
        if(erro) res.send({rs:`Token inválido ${erro}`})
        return next()
    })
}

app.listen(3000, ()=> console.log("Servidor Online ... "))