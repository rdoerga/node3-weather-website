const request = require('postman-request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e4aaf9497792bfe2dac9b2b84ca4ddd0&query='+ latitude+',' + longitude + '&units=m'
    request({ url :url,json: true},(error,{body}) => {
        if (error) {
            callback('unable to connect to weatherstack services',undefined)
        } else if (body.current === undefined){
            callback('unable to find weather for location ',undefined)
        } else {
            callback(undefined, 'temp feels like: '+body.current.feelslike+', the UV-index is '+body.current.uv_index)
        }
    })
    
 
}

module.exports = forecast