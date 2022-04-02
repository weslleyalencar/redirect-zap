var express = require('express');
var api = require("./api")
var app = express()
var porta = process.env.PORT || 8080

app.get('/', (req, res) => {
    res.send({ message: "Servidor online" })
})

app.get('/:appId/:tableId', async (req, res) => {
    let { appId, tableId } = req.params
    let link = await api.getLink(appId, tableId)

    if (link === 'Limite') {
        res.send({ message: "Redirects Esgotados!" })
    } else {
        res.redirect(link)
    }

})

app.use(express.json)

app.listen(porta, () => {
    console.log('Servidor rodando na porta ' + porta);
})
