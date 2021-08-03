const request = require('request');

const forecast = (location, callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=a8ef86ec1344f080853f40327772b23e&query="+location;
   
    request({ url, json: true }, (error, { body }={}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,body.current.weather_descriptions + '. It is currently ' + body.current.temperature+" Degree Celcius")
        }
    })
}



module.exports = forecast