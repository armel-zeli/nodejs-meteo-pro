const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

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
app.get('/meteo', (req, res) => {
    const address = req.query.address

    if (!address) {
        return res.send({
            error: 'Merci de fournir une adresse'
        })
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {

        if(error){
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, data) => {
            if(error){
                return res.send({
                    error
                })
            }

            res.send({
                address: address,
                forecast: data,
                location: location
            })
        })
    })

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

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})