var express = require('express');
var api = require("./api")
var app = express()  
var porta = process.env.PORT || 8080

app.get('/', (req, res) =>{
    res.send({message: "Servidor online"})
})

app.get('/:appId/:tableId', async (req, res) => {    
    let {appId, tableId} = req.params
    res.redirect(await api.getLink(appId, tableId))    
})


app.use(express.json)


app.listen(porta, () => {
    console.log('Servidor rodando na porta ' + porta);
})
