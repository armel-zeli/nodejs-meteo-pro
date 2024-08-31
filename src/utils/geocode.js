const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXJtZWwtemVsaSIsImEiOiJjazJlamN3MXQwMDR6M2lxa2Qwc3R5Z2MwIn0.VmGq4Mv06CLelZTu3B2Veg&language=fr&limit=1'
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback("Impossible de se connecter à l'api mapbox !", undefined)
        } else if (body.message) {
            callback(body.message, undefined)
        } else if (body.features.length === 0) {
            callback("Ville introuvable, veuillez faire une autre recherche !", undefined)
        } else {
            callback(null, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                'location': body.features[0].place_name
            })
        }
    })
}

module.exports = geocode