var axios = require('axios');
var baseLinks = []
var appId = ''
var tableId = ''


async function getRecords() {
    var config = {
        method: 'get',
        url: `https://api.airtable.com/v0/${appId}/${tableId}?sort%5B0%5D%5Bfield%5D=grupo`,
        headers: {
            'Authorization': 'Bearer key2taSf9u5irVQbj',
            'Cookie': 'brw=brwtWENt6XX5vwfYV'
        }
    };

    await axios(config)
        .then(function (response) {
            let base = JSON.parse(JSON.stringify(response.data))
            base.records.forEach(e => {
                let registro = {
                    "id": e.id,
                    "fields": {
                        "grupo": e.fields.grupo,
                        "link": e.fields.link,
                        "contagemAtual": e.fields.contagemAtual,
                        "contagemTotal": e.fields.contagemTotal
                    }
                }
                baseLinks.push(registro)
            });

        })
        .catch(function (error) {
            console.log(error);
        });
}


async function getNextLink() {    
    for (let link in baseLinks) {
        if (baseLinks[link].fields.contagemAtual < baseLinks[link].fields.contagemTotal) {
            baseLinks[link].fields.contagemAtual++
            return baseLinks[link].fields.link
        }
    }
    return "Limite"
}

async function updateRecords() {

    var data = {
        "records": baseLinks
    }

    var config = {
        method: 'patch',
        url: `https://api.airtable.com/v0/${appId}/${tableId}`,
        headers: {
            'Authorization': 'Bearer key2taSf9u5irVQbj',
            'Content-Type': 'application/json',
            'Cookie': 'brw=brwtWENt6XX5vwfYV'
        },
        data: data
    };

    await axios(config)
        .then(function (response) {
            console.log('Atualizado com sucesso!');
            baseLinks = []
        })
        .catch(function (error) {
            console.log(error);
        });

}

async function getLink(appIdParam, tableIdParam) {
    try {
        appId = appIdParam
        tableId = tableIdParam
        await getRecords()
        let link = await getNextLink()
        if(link !== 'Limite'){
            await updateRecords()
        }
        return link     

    } catch (error) {
       
    }   
}

// async function main(){
// let link = await getLink("appKQvKEm9xtHgy8T","tblX6Ps0CDJ12pulr")    
    
    
//  console.log(link)
// }

// main()

module.exports.getLink = getLink