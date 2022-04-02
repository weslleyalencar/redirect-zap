var express = require('express');
var api = require("./api")
var app = express()  
var axios = require('axios');
var baseLinks = []




app.get('/:appId/:tableId', async (req, res) => {    
    let {appId, tableId} = req.params
    res.redirect(await api.getLink(appId, tableId))    
})





app.listen(port = 3000, () => {
    console.log('Servidor rodando na porta ' + port);
})
