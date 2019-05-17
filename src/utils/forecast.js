const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/1d9f4c4ba0b0b558cb2dae3f189313bb/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('unable to fin location', undefined)
        } else {
            const { currently: actual } = body
            const { precipProbability, temperature } = actual
            const { summary } = body.daily.data[0]
            const resul = summary + ' ' + 'It is currently ' + temperature +
                'farenheit degreess out.' + 'There is a ' + precipProbability + '% chance of rain'
            callback(undefined, resul)
        }

    })
}

module.exports = forecast