const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/2c4db1003965a2d1fad6bb2c89675839/${latitude},${longitude}?units=si&lang=fr`

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Impossible de se connecter à l'api darksy !", undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            const temperature = body.currently.temperature
            const chanceOfRain = body.currently.precipProbability
            const daily = body.daily.data[0].summary
            callback(undefined, daily + ` Il fait actuellement ${temperature} degrés dehors . Il y'a  ${chanceOfRain} % de chance qu'il pleuve`)
        }
    })

}

module.exports = forecast
