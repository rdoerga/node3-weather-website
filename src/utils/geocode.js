const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoicmRvZXJnYSIsImEiOiJjbHZoejd0bzUwMzc4Mmtta25oNHVoa2gyIn0.CbuvhEQ7_kJ_YL69aCJz-A&limit=1'
    request({ url :url,json: true},(error,{body}) => {
        const {features} = body
        if (error) {
            callback('unable to connect to location services',undefined)
        } else if (features.length === 0) {
            callback('unable to find to location. Try another search',undefined)
        } else {
            callback(undefined, {
                latitude: features[0].center[1],
                longtitude: features[0].center[0],
                location: features[0].place_name
            })
        }
    })
 }

 module.exports = geocode