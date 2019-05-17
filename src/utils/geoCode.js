const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2hhbGltYnUiLCJhIjoiY2p2bzBybWx6MW5iZjN5cGJpeWE1dmp1ZyJ9.BN8K03LhMfAsQsjwZJC-lw'
    request({ url, json: true },
        (error, { body }) => {
            if (error) {
                callback('unable to connect to location services', undefined)
            } else if (body.features.length === 0) {
                callback('Unable to find location.Try another search', undefined)
            } else {
                const {
                    [0]: longitude, [1]: latitude
                } = body.features[0].center
                const { place_name: location } = body.features[0]
                callback(undefined, {
                    latitude,
                    longitude,
                    location
                })
            }
        })

}

module.exports = geoCode