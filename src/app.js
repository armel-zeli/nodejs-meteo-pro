const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000

const app = new express()

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handelbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set up directory to serve
app.use(express.static(publicDirectoryPath))

// Route definition
app.get('', (req, res) => {
    res.render('index', {
        title: "Météo Pro",
        name: 'Armel Zéli'
    })

})

app.get('/a-propos', (req, res) => {
    res.render('a-propos', {
        title: 'A propos',
        name: 'Armel Zéli'
    })
})

app.get('/aide', (req, res) => {
    res.render('aide', {
        title: 'Aide',
        name: 'Armel Zéli',
        message: 'Bonjour, puis-je vous aider ?'
    })
})
app.get('/meteo', async (req, res) => {
    const address = req.query.address

    if (!address) {
        return res.send({
            error: 'Merci de fournir une adresse'
        })
    }
    
    try {
        const { latitude, longitude, location } = await geocode(address);
        const result = await forecast(latitude, longitude);
        return res.send({ address, location, forecast: result });
    } catch (error) {
        return res.send({error})
    }
    
})

app.get('/aide/*', (req, res) => {
    res.render('404', {
        message: "Aucun article sur le sujet",
        title: 'Erreur 404',
        name: 'Armel Zéli'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page inexistante',
        title: 'Erreur 404',
        name: 'Armel Zéli'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})